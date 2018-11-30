// React Imports
import React from "react";

// Materialize Imports
import { Card } from "react-materialize";

// CSS & Local Imports
import ReportsPageHeader from "./ReportsPageHeader";
import ClipboardIcon from "./clipboard-blue-opacity.png";
import "./Reports.css";

class ReportsPage extends React.Component {
  render() {
    return (
      <div>
        <ReportsPageHeader />
        <div className="wrapper">
          <img id="icon" src={ClipboardIcon} />
          <div className="coming-soon">Feature Coming Soon!</div>
        </div>
      </div>
    );
  }
}

export default ReportsPage;
