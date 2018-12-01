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
		newsfeedItems: []
	};
	
	componentDidMount() {
		this.getNewsfeedItems();
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
	
	renderNewsfeedItem = item => {
		const { activityType } = item;
		console.log(activityType, item);
		let header;
		let body;
/*
		if (activityType == 'newUser') { console.log('aioejfoajwofaew'); return (
			<CollapsibleItem header = {`Welcome, ${item.userFirstName}!`} icon = 'announcement'>
      			<div className='white-text'>
					<h4>{`${item.userFirstName} ${item.userLastName}`}</h4>
					<p>Has joined {this.props.organization.name}!</p>
					<p>{moment(item.date).format('MMMM DD, YYYY')}</p>
				</div>
			</CollapsibleItem>
		); }
*/
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
				
/*
				body = (
					<div className='white-text'>
						<h5>{`${item.userFirstName} ${item.userLastName}`}</h5>
						<p>Has joined {this.props.organization.name}!</p>
						<p>{moment(item.date, 'X').format('MMMM DD, YYYY')}</p>
					</div>
				);
*/
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
/*
				body = (
					<div className='white-text'>
						<h4>{`${item.userFirstName} ${item.userLastName}`}</h4>
						<p>Has joined {this.props.organization.name} and has completed {item.numberOfCompletedTrainings} trainings!</p>
						<p>{moment(item.date).format('MMMM DD, YYYY')}</p>
					</div>
				);
*/
				break;
			case 'traningCompleted':
			
				break;
			case 'newOrganization':
				header = `${item.organizationName}`;
				return (
					<CollapsibleItem header = {header} className="border-bottom z-depth-0" icon = 'assignment_turned_in'>
		      			<div className='white-text'>
		      				<Link className='white-text' to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${item.__user}`}>
								<h5>{`${item.userFirstName} ${item.userLastName}`}</h5>
							</Link>
							<p>created <b>{this.props.organization.name}!</b>!</p>
							<p>{moment(item.date).format('MMMM DD, YYYY')}</p>
						</div>
					</CollapsibleItem>
				);
				break;
			default:
			
				break;
		}
		console.log(header, body);
		return (
			<CollapsibleItem header = {header} className="border-bottom z-depth-0" icon = 'announcement'>
	      		
	      	</CollapsibleItem>
		);
	};
	
  render() {
	  
    const { newsfeedItems } = this.state;
  
	  
	  const filteredNewsfeedItems = newsfeedItems.slice(0, 5);
	  
	  console.log(filteredNewsfeedItems);
	  
    return (
      <div>
        <PageHeader organization={this.props.organization} />
        <div className="dashboard-wrapper">
          <div className="snapshot-wrapper">
            <div id="snapshot-card" className="card z-depth-0 dashboard-card">
              <div id='snapshot-content' className="card-content white-text">
                <span id='snapshot-card-title' className="card-title center-align white-text">Weekly Snapshot</span>                 
                <ul id='snapshot-collection' className="collection">
                  <li className="collection-item avatar white-text">
                    <div className="row">
                      <div className="col s12 valign-wrapper">
                        <i className="material-icons medium transparent">warning</i>{" "}
                        <span className="trainings-overdue-qty">2</span><span className="trainings-overdue-content"> Employees Have Trainings Overdue </span>
                      </div>                                        
                    </div>
                  </li>
                  <li class="collection-item avatar white-text">
                  <div className="row">
                      <div className="col s12 valign-wrapper">
                        <i className="material-icons medium transparent">notification_important</i>{" "}
                        <span className="trainings-upcoming-qty">6</span><span className="trainings-upcoming-content">Trainings Upcoming</span>
                      </div>                                        
                    </div>
                  </li>
                  <li className="collection-item avatar white-text">
                  <div className="row">
                      <div className="col s12 valign-wrapper">
                        <i className="material-icons medium transparent">check</i>{" "}
                        <span className="trainings-complete-qty">0</span><span className="trainings-complete-content">Trainings Complete</span>
                      </div>                    
                    </div>
                  </li>
                  <li className="collection-item avatar white-text">
                  <div className="row">
                      <div className="col s12 valign-wrapper">
                        <i className="material-icons medium transparent">schedule</i>
                        <span className="trainings-due-qty">3</span><span className="trainings-due-content">Employees Have Trainings Due</span>                       
                      </div>                                        
                  </div>
                  </li>
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
