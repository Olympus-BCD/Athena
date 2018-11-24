import React from "react";
import { Link } from "react-router-dom";
import "./EmployeesPageHeader.css";

class EmployeesPageHeader extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" id="brand-logo" class="brand-logo">
              Employees
            </a>
            <ul className="right hide-on-med-and-down">
              <li id="header-date">Date</li>
            </ul>
          </div>
        </nav>
        <div className="row valign-wrapper">
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
          <div className="col s4" />
          <div className="col s4">
            <Link
              to={`/${this.props.organization.name.replace(
                /\s/g,
                ""
              )}/employees/add`}
            >
              <a className="waves-effect waves-light btn">
                <i className="material-icons left">person_add</i>Add Employee
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeesPageHeader;
