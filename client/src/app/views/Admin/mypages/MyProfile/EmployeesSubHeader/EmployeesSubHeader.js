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
                <input id="search" type="search" required onChange={this.props.searchEmployees} />
                <label className="label-icon" for="search">
                  <i className="material-icons">search</i>
                </label>
                <i id='search-close-icon' className="material-icons">close</i>
              </div>
            </form>
          </div>
        ) : (
	        <div className='col s4'><Link to={`/${organization.name.replace(/\s/g, '')}/employees`}><i className=" back material-icons small">
          arrow_back</i></Link></div>
	    )}
          <div className="col s4" />
        { addEmployee
	    ? (
          <div className="col s4">
            <Link to={`/${organization.name.replace(/\s/g, "")}/employees/add`} >
              <a href="!#" id="add-employee-button" className="waves-effect waves-light btn float-right">
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
