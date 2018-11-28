// React Imports
import React from "react";

// Materialize Imports
import { Collapsible } from "react-materialize";
import { CollapsibleItem } from "react-materialize";
import { Input } from "react-materialize";
import { Button } from "react-materialize";
import { Icon } from "react-materialize";

// CSS Imports
import PageHeader from "./../../../components/PageHeader/PageHeader";
import "./Dashboard.css";

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeader />
        <div className="dashboard-wrapper">
          <div className="snapshot-wrapper">
            <div id="snapshot-card" className="card z-depth-3 dashboard-card">
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
                        <p>
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
            <div id="calendar-card" className="card z-depth-3 dashboard-card">
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
            <div id="announcement-card" class="card z-depth-3 dashboard-card">
              <div class="card-content">
                <span class="card-title center-align white-text">Announcements</span>
                <Collapsible popout defaultActiveKey={1}>
                  <CollapsibleItem header="Add Announcement" icon="add_comment">
                    <Input s={6} label="Title" id="announcement-title-input" className="white-text"/>
                    <Input type="textarea" label="Announcement" />
                    <Button id="announcement-button" waves="purple" >
                      Save<Icon right>save</Icon>
                    </Button>
                  </CollapsibleItem>
                  <CollapsibleItem header="Upcoming Holiday" icon="announcement" >
                   <p className="white-text"> We would like to Wish you all a very Merry Christmas and Happy New Year!</p>
                  </CollapsibleItem>
                  <CollapsibleItem header="New Hire" icon="announcement">
                    Please welcome our new Front End Developer, Tony Stark, to the team.
                  </CollapsibleItem>
                </Collapsible>
              </div>
            </div>
          </div>
          <div className="newsfeed-wrapper">
            <div
              id="company-news-card"
              className="card z-depth-3 dashboard-card"
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
