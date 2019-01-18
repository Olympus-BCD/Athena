// React Imports
import React from "react";
import { Link } from 'react-router-dom';

// NPM Imports
import moment from 'moment';


// Materialize Imports
import { Collapsible } from "react-materialize";
import { CollapsibleItem } from "react-materialize";
import { Input } from "react-materialize";
import { Button } from "react-materialize";
import { Icon } from "react-materialize";

// CSS & Local Imports
import PageHeader from "./../../../components/PageHeader/PageHeader";
import Calendar from "../../../components/Calendar/Calendar";
import Clock from "./Clock";
import "./Dashboard.css";

import API from '../../../../../utils/API';

class DashboardPage extends React.Component {
	
	state = {
		message: '',
		trainings: [],
		newsfeedItems: [],
		employees: [],
		timeframe: {
			weekly: false,
			thirtyDays: true
		},
		currentTimeframe: 'thirtyDays'
	};
	
	componentDidMount() {
		this.getEmployees();
	}
	
	getNewsfeedItems = () => {
		const query = {
			__organization: this.props.organization._id
		};
		API.newsfeed.getNewsfeedItems(query).then(results => {
			if(results.data.success) {
				console.log('Newsfeed Items:', results.data.newsfeedItems)
				results.data.newsfeedItems.forEach(item => {
					if(item.activityType == 'hybrid') console.log('Hybrid:', item);
				});
				this.setState({ newsfeedItems: results.data.newsfeedItems, message: '' });
			} else {
				this.setState({ message: results.data.msg });
			}
			
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh oh! Something went wrong!' });
		});
	};
	
	getEmployees = () => {
		const query = {
			__organization: this.props.organization._id
		};
		API.auth.getUsers(query).then(res => {
			if(res.data.success) {
				this.setState({ employees: res.data.users });
				this.getNewsfeedItems();
			} else {
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			console.log(err);
			
			this.setState({ message: 'Uh Oh! Something went wrong!' });
			
		});
	};
	
	addAnnouncement = () => {
		const newsfeedItem = {
			__user: this.props.user._id,
			__organization: this.props.organization._id,
			title: this.state.title,
			body: this.state.body,
			activityType: 'announcement'
		};
		API.newsfeed.create(newsfeedItem).then(res => {
			if(res.data.success) {
				this.setState({ title: '', body: '' });
				this.getNewsfeedItems();
			} else {
				console.log('Error creating newsfeed item:', res.data.error);
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			console.log('Error creating newsfeed item:', err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	onChange = e => {
		const { name, value } = e.target;
		const state = this.state;
		state[name] = value;
		this.setState(state);
	};
	
	renderNewsfeedItem = item => {
		const { activityType } = item;
// 		console.log(activityType, item);
		let header;

		switch(activityType) {
			case 'newUser':
				header = `Welcome, ${item.userFirstName}!`;
				return (
					<CollapsibleItem header = {header} className="border-bottom z-depth-0" icon = 'person_pin'>
		      			<div className='white-text'>
		      				<Link className='white-text' to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${item.__user}`}>
		      					<div className='newsfeed-img' style={{ backgroundImage: `url(${item.__user.imageURL})` }}></div>
								<h5>{`${item.userFirstName} ${item.userLastName}`}</h5>
							</Link>
							<p className='clear'>Has joined <b>{this.props.organization.name}</b>!</p>
							<p className='newsfeed-date'>- {moment(item.date).format('MMMM DD, YYYY')} -</p>
						</div>
					</CollapsibleItem>
				);
				break;
			case 'hybrid':
				header = `Welcome, ${item.userFirstName}!`;
				return (
					<CollapsibleItem header = {header} className="border-bottom z-depth-0" icon = 'how_to_reg'>
		      			<div className='white-text'>
							<Link className='white-text' to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${item.__user}`}>
								<div className='newsfeed-img' style={{ backgroundImage: `url(${item.__user.imageURL})` }}></div>
								<h5>{`${item.userFirstName} ${item.userLastName}`}</h5>
							</Link>
							<p className='clear'>Has joined <b>{this.props.organization.name}</b> and has completed {item.numberOfCompletedTrainings} trainings!</p>
							<p className='newsfeed-date'>- {moment(item.date).format('MMMM DD, YYYY')} -</p>
						</div>
					</CollapsibleItem>
				);
				break;
			case 'trainingCompleted':
				return(
					<CollapsibleItem header = {`Congrats, ${item.__user.fname}!`} icon = 'assignment_turned_in'>
		      			<div className='white-text'>
		      				<Link className='white-text' to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${item.__user._id}`}>
		      					<div className='newsfeed-img' style={{ backgroundImage: `url(${item.__user.imageURL})` }}></div>
								<h5>{`${item.__user.fname} ${item.__user.lname}`}</h5>
							</Link>
							<p className='clear'>completed <b>{item.trainingName}!</b></p>
							<p className='newsfeed-date'>- {moment(item.date).format('MMMM DD, YYYY')} -</p>
						</div>
					</CollapsibleItem>
				);
				break;
			case 'newOrganization':
				header = `${item.organizationName}`;
				return (
					<CollapsibleItem header = {header} className="border-bottom z-depth-0" icon = 'assignment_turned_in'>
		      			<div className='white-text'>
		      				<Link className='white-text' to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${item.__user}`}>
								<h5>{`${item.userFirstName} ${item.userLastName}`}</h5>
							</Link>
							<p className='clear'>created <b>{this.props.organization.name}!</b></p>
							<p className='newsfeed-date'>- {moment(item.date).format('MMMM DD, YYYY')} -</p>
						</div>
					</CollapsibleItem>
				);
				break;
			case 'announcement':
				return (
					<CollapsibleItem header={item.title} className='' icon='event_note'>
						<div className='white-text'>
							<p>{item.body}</p>
							<p className='newsfeed-date'>- {moment(item.date).format('MMMM DD, YYYY')} -</p>
						</div>
					</CollapsibleItem>
				);
				break;
			default:
			
				break;
		}
		return (
			<CollapsibleItem header = {header} className="border-bottom z-depth-0" icon = 'announcement'>
	      		
	      	</CollapsibleItem>
		);
	};
	
	getCalendarEvents = () => {
		const { employees, timeframe } = this.state;
		let events = [];
		
		const days = timeframe.weekly ? moment().endOf('isoWeek').diff(moment(), 'days') : 30;
		const timeframeCutOff = moment().add(days, 'days').endOf('day').format('X');
		
		const oneWeekCutOff = moment().add(7, days).endOf('day').format('X');
		
		employees.forEach(employee => {
			if(employee.active) {
				employee.trainingInstances.forEach(training => {
					if(training.completed) {
						events.push({
							title: `${employee.fname} completed ${training.name}`,
							type: 'training-completed',
							start: moment(training.dateCompleted, 'X').format('MMMM DD, YYYY'),
							end: moment(training.dateCompleted, 'X').format('MMMM DD, YYYY'),
							allDay: false,
							className: 'calendar-event event-training-completed'
						});
					} else if(training.dueDate < moment().startOf('day').format('X')) {
						events.push({
							title: `OVERDUE: ${employee.fname} requires ${training.name}`,
							type: 'training-overdue',
							start: moment(training.dueDate, 'X').format('MMMM DD, YYYY'),
							end: moment(training.dueDate, 'X').format('MMMM DD, YYYY'),
							allDay: false,
							className: 'calendar-event event-training-overdue'
						});
					} else if(training.dueDate < oneWeekCutOff) {
						events.push({
							title: `${employee.fname} requires ${training.name}`,
							type: 'training-urgent',
							start: moment(training.dueDate, 'X').format('MMMM DD, YYYY'),
							end: moment(training.dueDate, 'X').format('MMMM DD, YYYY'),
							allDay: false,
							className: 'calendar-event event-training-urgent'
						});
					} else {
						events.push({
							title: `${employee.fname} requires ${training.name}`,
							type: 'training-future',
							start: moment(training.dueDate, 'X').format('MMMM DD, YYYY'),
							end: moment(training.dueDate, 'X').format('MMMM DD, YYYY'),
							allDay: false,
							className: 'calendar-event event-training-future'
						});
					}
				});
				
				events.push({
					title: `Hours due for ${employee.fname} ${employee.lname}`,
					type: 'employee-hours-due',
					start: moment(employee.hoursResetDate, 'X').format('MMMM DD, YYYY'),
					end: moment(employee.hoursResetDate, 'X').format('MMMM DD, YYYY'),
					allDay: false,
					className: 'calendar-event event-hours-due'
				});
				
				if(moment(employee.hireDate, 'X').year() != moment().year() && employee.hireDate != 0) {
					const mmmmdd = moment(employee.hireDate, 'X').format('MMMM DD');
					const yyyy = moment().year();
					const anniversary = `${mmmmdd}, ${yyyy}`;
					const diff = moment(anniversary, 'MMMM DD, YYYY').diff(moment(), 'years');
					events.push({
						title: `${diff} Year Anniversary: ${employee.fname} ${employee.lname}`,
						type: 'employee-anniversary',
						start: anniversary,
						end: anniversary,
						allDay: false,
						className: 'calendar-event event-employee-anniversary'
					});
				} else if(employee.hireDate != 0) {
					events.push({
						title: `Hired ${employee.fname} ${employee.lname}`,
						type: 'employee-hired',
						start: moment(employee.hireDate, 'X').format('MMMM DD, YYYY'),
						end: moment(employee.hireDate, 'X').format('MMMM DD, YYYY'),
						allDay: false,
						className: 'calendar-event event-employee-hired'
					});
				}
			}
		});
		
		return events;
	};
	
	getSnapshot = (days = 30) => {
		const { employees } = this.state;
		
		const cutOff = moment().add(days, 'days').endOf('day').format('X');
		const completedCutOff = days < 8 ? moment().startOf('isoWeek').format('X') : days;
		let data = {
			upcomingCount: 0,
			upcomingEmployees: [],
			overdueCount: 0,
			overdueEmployees: [],
			completedCount: 0,
			completedEmployees: [],
			hoursUpcomingCount: 0,
			hoursUpcomingEmployees: []
		};

		employees.forEach(employee => {
			if(employee.active) {
				employee.trainingInstances.forEach(training => {
					
					if(training.dueDate < moment().startOf('day').format('X') && !training.completed) {
						data.overdueCount++;
						data.overdueEmployees.push(employee);
					} else if(training.dueDate < cutOff && !training.completed) {
						data.upcomingCount++;
						data.upcomingEmployees.push(employee);
// 					} else if(training.completed && training.dateCompleted >= moment().subtract(days, 'days').format('X')) {
					} else if(training.completed && training.dateCompleted >= completedCutOff) {
						data.completedCount++;
						data.completedEmployees.push(employee);
					}
					
				});
			}
			if(employee.active && employee.trackHours && employee.hoursResetDate < cutOff) {
				data.hoursUpcomingCount++;
				data.hoursUpcomingEmployees.push(employee);
			}
		});
		
		return data;
	};
	
	changeTimeframe = e => {
		const { timeframe } = this.state;
		timeframe.weekly = timeframe.thirtyDays = false;
		timeframe[e.target.id] = true;
		this.setState({ timeframe: timeframe, currentTimeframe: e.target.id });
	};
	
  render() {
	  
    const { newsfeedItems, employees, timeframe, title, body } = this.state;
  
	const filteredNewsfeedItems = newsfeedItems.slice(0, 10);
	
	const startOfNextWorkWeek = moment().startOf('isoWeek').add(7, 'days');
	const endOfWorkWeek = moment().endOf('isoWeek');
	const now = moment();
	const days = timeframe.weekly ? endOfWorkWeek.diff(now, 'days') : 30;
	const snapshot = this.getSnapshot(days);
	
	const events = this.getCalendarEvents();
	console.log('Events:', events);
		  
    return (
      <div>
        <PageHeader organization={this.props.organization} />
        <div className="dashboard-wrapper">
          <div className="snapshot-wrapper">
            <div id="snapshot-card" className="card z-depth-0 dashboard-card">
              <div id='snapshot-content' className="card-content white-text">
                <span id='snapshot-card-title' className="card-title center-align white-text"> 
                	<span className='timeframeLink-wrapper'>
                		<span className={timeframe.weekly ? 'timeframeLink timeframeLink-selected' : 'timeframeLink'} id='weekly' onClick={this.changeTimeframe}>This Week </span>
                		<span className='bar'> | </span>
                		<span className={timeframe.thirtyDays ? 'timeframeLink timeframeLink-selected' : 'timeframeLink'} id='thirtyDays' onClick={this.changeTimeframe}>Within 30 Days</span>
                	</span>
                </span>                 
                <ul id='snapshot-collection' className="collection">
                  <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?filter=overdue&timeframe=${this.state.currentTimeframe}`}>
                  	<li className="collection-item avatar white-text">
	                    <div className="row">
	                      <div className="col s12 valign-wrapper">
	                        <i className="material-icons medium transparent">warning</i>{" "}
	                        <span id="trainings-overdue-qty">{snapshot.overdueCount}</span>
	                        <span className="trainings-overdue-content">Training{snapshot.overdueCount !== 1 ? 's' : null} Overdue </span>
	                      </div>                                        
	                    </div>
					</li>
                  </Link>
                  <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?filter=upcoming&timeframe=${this.state.currentTimeframe}`}>
	                  <li class="collection-item avatar white-text">
	                  <div className="row">
	                      <div className="col s12 valign-wrapper">
	                        <i className="material-icons medium transparent">notification_important</i>{" "}
	                        <span id="trainings-upcoming-qty">{snapshot.upcomingCount}</span>
	                        <span className="trainings-upcoming-content">Training{snapshot.upcomingCount !== 1 ? 's' : null} Upcoming</span>
	                      </div>                                        
	                    </div>
	                  </li>
	              </Link>
	              <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?filter=completed&timeframe=${this.state.currentTimeframe}`}>
	                  <li className="collection-item avatar white-text">
	                  <div className="row">
	                      <div className="col s12 valign-wrapper">
	                        <i className="material-icons medium transparent">check</i>{" "}
	                        <span id="trainings-complete-qty">{snapshot.completedCount}</span>
	                        <span className="trainings-complete-content">Training{snapshot.completedCount !== 1 ? 's' : null} Complete</span>
	                      </div>                    
	                    </div>
	                  </li>
	              </Link>
	              <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?filter=expiring&timeframe=${this.state.currentTimeframe}`}>
	                  <li className="collection-item avatar white-text">
	                  <div className="row">
	                      <div className="col s12 valign-wrapper">
	                        <i className="material-icons medium transparent">schedule</i>
	                        <span id="trainings-due-qty">{snapshot.hoursUpcomingCount}</span>
	                        <span className="trainings-due-content">Employee{snapshot.hoursUpcomingCount !== 1 ? 's' : null} With Expiring Hours</span>                       
	                      </div>                                        
	                  </div>
	                  </li>
	              </Link>
                </ul>
              </div>
            </div>
          </div>
          <div className="calendar-wrapper">
            <div id="calendar-card" className="card z-depth-0 dashboard-card">
              <div id="cardContent" className="card-content white-text">
                <span id="cardTitle" className="card-title center-align">Calendar</span>
                <p className='calendar-wrap'>
                    <Calendar events={events} />
                </p>
              </div>
            </div>
          </div>
          <div className="announcements-wrapper z-depth-0 ">
            <div id="announcement-card" className="card z-depth-0 dashboard-card">
              <div className="card-content">
                <span className="card-title center-align white-text">Company News Feed</span>

                <Collapsible id="announcement-collection"  className="z-depth-0" popout defaultActiveKey={1} >
                  <CollapsibleItem id='add-announcement' header="Add Announcement" icon="add_comment" className="z-depth-0">
                    <Input onChange={this.onChange} name='title' value={title} s={6} label="Title" id="announcement-title-input" className="white-text z-depth-0"/>
                    <Input onChange={this.onChange} name='body' value={body} type="textarea" className="white-text" label="Announcement" />
                    <Button onClick={this.addAnnouncement} id="announcement-button" waves="purple" >
                      Save<Icon right>save</Icon>
                    </Button>
                  </CollapsibleItem>
                    </Collapsible>

                <Collapsible id="newsfeed-collection" className="z-depth-0" popout defaultActiveKey={0} >              
                  {
	                  filteredNewsfeedItems.map(item =>
	                  	this.renderNewsfeedItem(item)
	                  )
                  }                                
                </Collapsible>

              </div>
            </div>
          </div>
          <div className="newsfeed-wrapper z-depth-0">
            <div
              id="company-news-card"
              className="card dashboard-card z-depth-0"
            >
              <div className="card-content white-text center">
                <Clock />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
