// React Imports
import React from "react";
import { Link } from "react-router-dom";

// CSS Imports
import "./PageHeader.css";

class PageHeader extends React.Component {
  render() {
    return (
      <nav className="transparent z-depth-0">
      <div class="nav-wrapper">
        <Link to="#" target="_blank" class="brand-logo center"><span id="dashboard-header">Welcome to {this.props.organization.name}</span></Link>
      </div>
    </nav>
    );
  }
}

export default PageHeader;
