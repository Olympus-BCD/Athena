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
      <div class="row">
        <div class="col s12 m12">
          <div class="card-panel teal z-depth-5">
            <div className="">
              <ul className="collection with-header">
                <li class="collection-header">
                  <h4>
                    Employees
                    <Link
                      to="/employees/add"
                      id="employee-add-button" 
                      class="btn-floating btn-small waves-effect waves-light red">
                      <i id="add-button-icon" class="material-icons">
                        person_add
                      </i>
                    </Link>
                  </h4>
                </li>
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeesCollection;
