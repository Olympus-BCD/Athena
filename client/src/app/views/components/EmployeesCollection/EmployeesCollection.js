// React Imports
import React from "react";
import { Route, Link, Switch } from "react-router-dom";

// Materialize Imports
// import { Collection, CollectionItem } from "react-materialize";

// CSS Imports
import "./EmployeesCollection.css";

import AvatarPlaceholder from "./AvatarPlaceholder.png";

class EmployeesCollection extends React.Component {
  render() {
    return (
                <Link to="/Employees">
          
          <li className="collection-item avatar">
            <img src={AvatarPlaceholder} alt="" className="circle" />
            <span className="title">John Smith</span>
            <p>
              Web Developer
              <br />
              Start Date
            </p>
          </li>
        </Link>

    );
  }
}

export default EmployeesCollection;
