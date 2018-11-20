// React Imports
import React from "react";

// Materialize Imports

// CSS Imports
import PageHeader from "./../../../components/PageHeader/PageHeader";
import "./Dashboard.css";

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeader />
        <div className="row">
          <div className="col s12">
            <div className="card-panel teal z-depth-5">
              <div className="row">
                <div className="col s6">
                  <div className="card blue-grey darken-1 z-depth-3">
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
                  <div className="card blue-grey darken-1 z-depth-3">
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
                  <div className="card blue-grey darken-1 z-depth-3">
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
                  <div className="card blue-grey darken-1 z-depth-3">
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
                  <div className="card blue-grey darken-1 z-depth-3">
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
                  <div className="card blue-grey darken-1 z-depth-3">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
