import React from "react";
import "./EmployeesPageHeader.css";

class EmployeesPageHeader extends React.Component {
  render() {
    return (
		<nav>
			<div class="nav-wrapper">
			<a href="#" class="brand-logo right">Employees</a>
			<form>
        <div class="input-field">
          <input id="search" type="search" required/>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
			</div>
  		</nav>
	)
  }
}

export default EmployeesPageHeader;
