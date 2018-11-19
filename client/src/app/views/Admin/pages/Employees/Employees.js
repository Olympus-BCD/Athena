import React from "react";
import { Route, Link, Switch } from 'react-router-dom';
import queryString from 'query-string';
import "./Employees.css";

import { ViewEmployees, AddEmployee, ViewEmployee } from './displays';

class EmployeesPage extends React.Component {
	
	parseQueryString = () => {
		const id = queryString.parse(this.props.location.search).id;
		if(id) {
			return <Route exact path='/:org/employees' render={props => <ViewEmployee {...props} organization={this.props.organization} user={this.props.user} id={id} />} />
		} else {
			return <Route exact path='/:org/employees' render={props => <ViewEmployees {...props} organization={this.props.organization} user={this.props.user} />} />
		}
	};
	
	render() {
		return (
			<div>
				<h2>Employees</h2>
				<ul>
					<li><Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees/add`}>Add Employee</Link></li>
				</ul>
				<Switch>
					{this.parseQueryString()}
					<Route exact path='/:org/employees/add' render={props => <AddEmployee {...props} organization={this.props.organization} user={this.props.user} />} />
					<Route render={props => <ViewEmployees {...props} organization={this.props.organization} user={this.props.user} />} />
				</Switch>
			</div>
		);
	}
}

export default EmployeesPage;