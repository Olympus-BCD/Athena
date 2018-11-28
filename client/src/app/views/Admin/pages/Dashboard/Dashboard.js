// React Imports
import React from "react";

// Materialize Imports

// CSS Imports
import PageHeader from "./../../../components/PageHeader/PageHeader";
import "./Dashboard.css";

import API from '../../../../../utils/API';

class DashboardPage extends React.Component {
	
	state = {
		message: '',
		trainings: []
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
				this.setState({ newfeedItems: results.data.newsfeedItems, message: '' });
			} else {
				this.setState({ message: results.data.msg });
			}
			
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh oh! Something went wrong!' });
		});
	};
	
  render() {
	  
    return (
      <div>
        <PageHeader />
        <div className="row">
          <div className="col s12">
            {/* <div className="card-panel z-depth-5"> */}
              <div className="row">
                <div className="col s6">
                  <div className="card z-depth-3 dashboard-card">
                    <div className="card-content white-text">
                      <span className="card-title">Card Title</span>
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    </div>
                    <div className="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                  </div>
                </div>
                <div className="col s6">
                  <div className="card z-depth-3 dashboard-card">
                    <div className="card-content white-text">
                      <span className="card-title">Card Title</span>
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    </div>
                    <div className="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="card z-depth-3 dashboard-card">
                    <div className="card-content white-text">
                      <span className="card-title">Card Title</span>
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    </div>
                    <div className="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s4">
                  <div className="card z-depth-3 dashboard-card">
                    <div className="card-content white-text">
                      <span className="card-title">Card Title</span>
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    </div>
                    <div className="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                  </div>
                </div>
                <div className="col s4">
                  <div className="card z-depth-3 dashboard-card">
                    <div className="card-content white-text">
                      <span className="card-title">Card Title</span>
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    </div>
                    <div className="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                  </div>
                </div>
                <div className="col s4">
                  <div className="card z-depth-3 dashboard-card">
                    <div className="card-content white-text">
                      <span className="card-title">Card Title</span>
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    </div>
                    <div className="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                  </div>
                </div>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
