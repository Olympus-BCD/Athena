import React from "react";
import "./TrainingsPageHeader.css";

import moment from 'moment';

class TrainingsPageHeader extends React.Component {
  render() {
    return (
        <nav id="trainings-header" className="z-depth-0">
          <div className="nav-wrapper">
            <span id="brand-logo" class="brand-logo">
              Trainings
            </span>
            <ul className="right hide-on-med-and-down">
              <li id="header-date">{moment().format('MMMM DD, YYYY')}</li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default TrainingsPageHeader;
