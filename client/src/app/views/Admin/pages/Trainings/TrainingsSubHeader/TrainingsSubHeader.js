import React from "react";
import { Link } from "react-router-dom";
import  "./TrainingsSubHeader.css";

class TrainingsSubHeader extends React.Component {
  render() {
	const { organization, search, addTraining } = this.props;
    return (
      <div className='subheader-wrapper'>
        <div className="row valign-wrapper">
        { search
    	? (
          <div className="col s4">
            <form>
              <div className="input-field">
                <input id="search" type="search" required />
                <label className="label-icon" for="search">
                  <i className="material-icons">search</i>
                </label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        ) : (
	        <div className='col s4'><Link to={`/${organization.name.replace(/\s/g, '')}/employees`}>BACK</Link></div>
	    )}
          <div className="col s4" />
        { addTraining
	    ? (
          <div className="col s4">
            <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings/add`}>
              <a href="!#" className="waves-effect waves-light btn float-right">
                <i className="material-icons left">event</i>Add Training
              </a>
            </Link>
          </div>
        ) : (
	        <div className='col s4'></div>
        )}
        </div>
      </div>
    );
  }
}

export default TrainingsSubHeader;
