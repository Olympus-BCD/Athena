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
import "./MyDashboard.css";

import API from '../../../../../utils/API';

class DashboardPage extends React.Component {
	
	state = {
		message: '',
		trainings: [],
		newsfeedItems: [],
		employees: []
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
								<h5>{`${item.userFirstName} ${item.userLastName}`}</h5>
							</Link>
							<p>Has joined <b>{this.props.organization.name}</b>!</p>
							<p>{moment(item.date).format('MMMM DD, YYYY')}</p>
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
								<h5>{`${item.userFirstName} ${item.userLastName}`}</h5>
							</Link>
							<p>Has joined <b>{this.props.organization.name}</b> and has completed {item.numberOfCompletedTrainings} trainings!</p>
							<p>{moment(item.date).format('MMMM DD, YYYY')}</p>
						</div>
					</CollapsibleItem>
				);
				break;
			case 'trainingCompleted':
				return(
					<CollapsibleItem header = {`Congrats, ${item.userFirstName}!`} icon = 'assignment_turned_in'>
		      			<div className='white-text'>
		      				<Link className='white-text' to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${item.__user}`}>
								<h5>{`${item.userFirstName} ${item.userLastName}`}</h5>
							</Link>
							<p>completed <b>{item.trainingName}!</b>!</p>
							<p>{moment(item.date).format('MMMM DD, YYYY')}</p>
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
							<p>created <b>{this.props.organization.name}!</b></p>
							<p>{moment(item.date).format('MMMM DD, YYYY')}</p>
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
	
	getSnapshot = (days = 30) => {
		const { employees } = this.state;
		
		const cutOff = moment().add(days, 'days').format('X');
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
					
					if(training.dueDate < moment().format('X') && !training.completed) {
						data.overdueCount++;
						data.overdueEmployees.push(employee);
					} else if(training.dueDate < cutOff && !training.completed) {
						data.upcomingCount++;
						data.upcomingEmployees.push(employee);
					} else if(training.completed && training.dateCompleted >= moment().subtract(days, 'days').format('X')) {
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
	
  render() {
	  
    const { newsfeedItems, employees } = this.state;
  
	const filteredNewsfeedItems = newsfeedItems.slice(0, 5);
	
	const snapshot = this.getSnapshot(); console.log('Snapshot:', snapshot);
	  
	console.log(filteredNewsfeedItems);
	console.log('Employees:', employees);
	  
    return (
      <div>
        <PageHeader organization={this.props.organization} />
        <div className="dashboard-wrapper">
          <div className="snapshot-wrapper">
            <div id="snapshot-card" className="card z-depth-0 dashboard-card">
              <div id='snapshot-content' className="card-content white-text">
                <span id='snapshot-card-title' className="card-title center-align white-text">Monthly Snapshot</span>                 
                <ul id='snapshot-collection' className="collection">
                  <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?filter=overdue`}>
                  	<li className="collection-item avatar white-text">
	                    <div className="row">
	                      <div className="col s12 valign-wrapper">
	                        <i className="material-icons medium transparent">warning</i>{" "}
	                        <span className="trainings-overdue-qty">{snapshot.overdueCount}</span>
	                        <span className="trainings-overdue-content">Training{snapshot.overdueCount !== 1 ? 's' : null} Overdue </span>
	                      </div>                                        
	                    </div>
					</li>
                  </Link>
                  <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?filter=upcoming`}>
	                  <li class="collection-item avatar white-text">
	                  <div className="row">
	                      <div className="col s12 valign-wrapper">
	                        <i className="material-icons medium transparent">notification_important</i>{" "}
	                        <span className="trainings-upcoming-qty">{snapshot.upcomingCount}</span>
	                        <span className="trainings-upcoming-content">Training{snapshot.upcomingCount !== 1 ? 's' : null} Upcoming</span>
	                      </div>                                        
	                    </div>
	                  </li>
	              </Link>
	              <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?filter=completed`}>
	                  <li className="collection-item avatar white-text">
	                  <div className="row">
	                      <div className="col s12 valign-wrapper">
	                        <i className="material-icons medium transparent">check</i>{" "}
	                        <span className="trainings-complete-qty">{snapshot.completedCount}</span>
	                        <span className="trainings-complete-content">Training{snapshot.completedCount !== 1 ? 's' : null} Complete</span>
	                      </div>                    
	                    </div>
	                  </li>
	              </Link>
	              <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?filter=expiring`}>
	                  <li className="collection-item avatar white-text">
	                  <div className="row">
	                      <div className="col s12 valign-wrapper">
	                        <i className="material-icons medium transparent">schedule</i>
	                        <span className="trainings-due-qty">{snapshot.hoursUpcomingCount}</span>
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
                    <Calendar/>
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
                    <Input s={6} label="Title" id="announcement-title-input" className="white-text z-depth-0"/>
                    <Input type="textarea" className="white-text" label="Announcement" />
                    <Button id="announcement-button" waves="purple" >
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
