import React from "react";
import "./ReportsPageHeader.css";

import moment from 'moment';

class ReportsPageHeader extends React.Component {
  render() {
    return (
        <nav id="employees-header" className="z-depth-0">
          <div className="nav-wrapper">
            <span id="brand-logo" class="brand-logo">
              Reports
            </span>
            <ul className="right hide-on-med-and-down">
              <li id="header-date">{moment().format('MMMM DD, YYYY')}</li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default ReportsPageHeader;
