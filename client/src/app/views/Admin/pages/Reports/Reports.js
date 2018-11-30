// React Imports
import React from "react";

// Materialize Imports
import { Card } from "react-materialize";

// CSS & Local Imports
import ReportsPageHeader from "./ReportsPageHeader";
import "./Reports.css";

class ReportsPage extends React.Component {
  render() {
    return (
      <div>
        <ReportsPageHeader />
        <div className="container-fluid">
			<div className="row">
				<div className="col s12">
					<Card id="report-card"/>
				</div>
			</div>
		</div>
      </div>
    );
  }
}

export default ReportsPage;
