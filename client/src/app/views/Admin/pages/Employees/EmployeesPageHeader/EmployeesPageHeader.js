import React from "react";
import { Link } from "react-router-dom";
import "./EmployeesPageHeader.css";

import moment from 'moment';

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
              <li id="header-date">{moment().format('MMMM DD, YYYY')}</li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default EmployeesPageHeader;
