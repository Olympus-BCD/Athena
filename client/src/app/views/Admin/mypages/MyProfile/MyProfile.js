// React Import
import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import queryString from "query-string";

// Materialize Import

// CSS & Local Component Import
import "./MyProfile.css";
import MyProfilePageHeader from './MyProfilePageHeader';
import { ViewProfile } from "./displays";

class MyProfilePage extends React.Component {

	render() {
		return (
			<div className="employeesPage">
				<MyProfilePageHeader organization={ this.props.organization } />
				
				<Switch>
					<Route render={props => (<ViewProfile {...props} organization={this.props.organization} user={this.props.user} /> )} />
				</Switch>
			</div>
		);
	}
}

export default MyProfilePage;
