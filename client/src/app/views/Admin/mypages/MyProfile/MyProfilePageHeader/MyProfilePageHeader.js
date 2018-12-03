import React from "react";
import "./MyProfilePageHeader.css";

import moment from 'moment';

class EmployeesPageHeader extends React.Component {
  render() {
    return (
        <nav id="employees-header" className="z-depth-0">
          <div className="nav-wrapper">
            <span id="brand-logo" class="brand-logo">
              My Profile
            </span>
            <ul className="right hide-on-med-and-down">
              <li id="header-date">{moment().format('MMMM DD, YYYY')}</li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default EmployeesPageHeader;
