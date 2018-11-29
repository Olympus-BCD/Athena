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

// CSS Imports
import PageHeader from "./../../../components/PageHeader/PageHeader";
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
				console.log('NEEEW UUUSERRRR');
				header = `Welcome, ${item.userFirstName}!`;
				return (
					<CollapsibleItem header = {header} icon = 'announcement'>
		      			<div className='white-text'>
		      				<Link className='white-text' to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${item.__user}`}>
								<h5>{`${item.userFirstName} ${item.userLastName}`}</h5>
							</Link>
							<p>Has joined {this.props.organization.name}!</p>
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
					<CollapsibleItem header = {header} icon = 'announcement'>
		      			<div className='white-text'>
							<Link className='white-text' to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${item.__user}`}>
								<h5>{`${item.userFirstName} ${item.userLastName}`}</h5>
							</Link>
							<p>Has joined {this.props.organization.name} and has completed {item.numberOfCompletedTrainings} trainings!</p>
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
			default:
			
				break;
		}
		console.log(header, body);
		return (
			<CollapsibleItem header = {header} icon = 'announcement'>
	      		
	      	</CollapsibleItem>
		);
	};
	
  render() {
	  
	  const { newsfeedItems } = this.state;
	  
	  const filteredNewsfeedItems = newsfeedItems.slice(0, 5);
	  
	  console.log(filteredNewsfeedItems);
	  
    return (
      <div>
        <PageHeader />
        <div className="dashboard-wrapper">
          <div className="snapshot-wrapper">
            <div id="snapshot-card" className="card z-depth-5 dashboard-card">
              <div className="card-content white-text">
                <span class="card-title center-align white-text">Weekly Snapshot</span>                 
                <ul class="collection">
                  <li class="collection-item avatar black-text">
                    <div className="row">
                      <div className="col s4">
                        <i class="material-icons circle red">warning</i>{" "}
                      </div>
                      <div className="col s4">       
                        <span class="trainings-overdue">2</span>
                      </div>  
                      <div className="col s4">
                        <p className="snapshot-text">
                          Trainings Overdue 
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="collection-item avatar black-text">
                  <div className="row">
                      <div className="col s4">
                        <i class="material-icons circle">notification_important</i>{" "}
                      </div>
                      <div className="col s4">       
                        <span class="trainings-overdue">6</span>
                      </div>  
                      <div className="col s4">
                        <p>
                         Trainings Upcoming
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="collection-item avatar black-text">
                  <div className="row">
                      <div className="col s4">
                        <i class="material-icons circle green">check</i>{" "}
                      </div>
                      <div className="col s4">       
                        <span class="trainings-upcoming">0</span>
                      </div>  
                      <div className="col s4">
                        <p>
                          Trainings Complete
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="collection-item avatar black-text">
                  <div className="row">
                      <div className="col s4">
                        <i class="material-icons circle yellow">schedule</i>{" "}
                      </div>
                      <div className="col s4">       
                        <span class="title">3</span>
                      </div>  
                      <div className="col s4">
                        <p>
                          Employees Have Trainings Due
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="calendar-wrapper">
            <div id="calendar-card" className="card z-depth-5 dashboard-card">
              <div className="card-content white-text">
                <span className="card-title center-align">Calendar</span>
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
            </div>
          </div>
          <div className="announcements-wrapper">
            <div id="announcement-card" class="card z-depth-5 dashboard-card">
              <div class="card-content">
                <span class="card-title center-align white-text">Announcements</span>
                <Collapsible popout defaultActiveKey={1} >
                  <CollapsibleItem id='add-announcement' header="Add Announcement" icon="add_comment" className="z-depth-5">
                    <Input s={6} label="Title" id="announcement-title-input" className="white-text"/>
                    <Input type="textarea" label="Announcement" />
                    <Button id="announcement-button" waves="purple" >
                      Save<Icon right>save</Icon>
                    </Button>
                  </CollapsibleItem>
                  <CollapsibleItem header="Upcoming Holiday" icon="announcement" className="z-depth-5" >
                   <p className="white-text"> We would like to Wish you all a very Merry Christmas and Happy New Year!</p>
                  </CollapsibleItem>
                  <CollapsibleItem header="New Hire" icon="announcement" className="z-depth-5">
                    Please welcome our new Front End Developer, Tony Stark, to the team.
                  </CollapsibleItem >
                  {
	                  filteredNewsfeedItems.map(item =>
	                  	this.renderNewsfeedItem(item)
	                  )
                  }
                </Collapsible>
              </div>
            </div>
          </div>
          <div className="newsfeed-wrapper">
            <div
              id="company-news-card"
              className="card z-depth-5 dashboard-card"
            >
              <div className="card-content white-text">
                <span className="card-title">Company News</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
