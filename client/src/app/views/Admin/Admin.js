import React from "react";
import "./Admin.css";

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MainNav from '../components/MainNav';

import { DashboardPage, EmployeesPage, TrainingsPage, ReportsPage, NetworkPage } from './pages';
import { MyDashboardPage, MyProfilePage } from './mypages';
/*
import EmployeesPage from './pages/Employees/Employeess';
import TrainingsPage from './pages/Trainings/Trainingss';
*/

class AdminView extends React.Component {
	
	state = {
		user: {}
	};	
	
	render() {
		console.log('From Admin.js:', this.props.organization);
		return(
			<div className='adminView-wrapper'>

				<MainNav
					user={this.props.user}
					organization={this.props.organization}
					logout={this.props.logout}
				/>
				<div className='pageContainer'>
					<Switch>
						<Route path='/:org/dashboard' render={(props) => <DashboardPage {...props} organization={this.props.organization} user={this.props.user} />} />
						<Route path='/:org/trainings' render={(props) => <TrainingsPage {...props} organization={this.props.organization} user={this.props.user} />} />	
						<Route path='/:org/employees' render={(props) => <EmployeesPage {...props} organization={this.props.organization} user={this.props.user} />} />
						<Route path='/:org/reports' component={ReportsPage} />
						<Route path='/:org/network' component={NetworkPage} />
						<Route path='/:org/mydashboard' render={(props) => <MyDashboardPage {...props} organization={this.props.organization} user={this.props.user} />} />
						<Route path='/:org/myprofile' render={(props) => <MyProfilePage {...props} organization={this.props.organization} user={this.props.user} />} />
						<Route render={(props) => <DashboardPage {...props} organization={this.props.organization} user={this.props.user} />} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default AdminView;