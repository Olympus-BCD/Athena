import React from "react";
import "./Admin.css";

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MainNav from '../components/MainNav';
import { DashboardPage, EmployeesPage, TrainingsPage, ReportsPage, NetworkPage } from './pages';
/*
import EmployeesPage from './pages/Employees/Employeess';
import TrainingsPage from './pages/Trainings/Trainingss';
*/

class AdminView extends React.Component {
	
	state = {
		user: {}
	};	
	
	render() {
		return(
			<div className=''>

				<MainNav
					user={this.props.user}
					organization={this.props.organization}
					logout={this.props.logout}
				/>
				<div>
					<Switch>
						<Route path='/:org/dashboard' component={DashboardPage} />
						<Route path='/:org/trainings' render={(props) => <TrainingsPage {...props} organization={this.props.organization} user={this.props.user} />} />	
						<Route path='/:org/employees' render={(props) => <EmployeesPage {...props} organization={this.props.organization} user={this.props.user} />} />
						<Route path='/:org/reports' component={ReportsPage} />
						<Route path='/:org/network' component={NetworkPage} />
						<Route component={DashboardPage} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default AdminView;