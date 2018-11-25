import React from "react";
import { Link } from "react-router-dom";
import "./EmployeesSubHeader.css";

class EmployeesSubHeader extends React.Component {
  render() {
	const { organization, search, addEmployee } = this.props;
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
        { addEmployee
	    ? (
          <div className="col s4">
            <Link to={`/${organization.name.replace(/\s/g, "")}/employees/add`} >
              <a className="waves-effect waves-light btn float-right">
                <i className="material-icons left">person_add</i>Add Employee
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

export default EmployeesSubHeader;
