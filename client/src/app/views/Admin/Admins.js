import React from "react";
import "./Admin.css";

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { DashboardPage, ReportsPage, NetworkPage } from './pages';
import EmployeesPage from './pages/Employees/Employeess';
import TrainingsPage from './pages/Trainings/Trainingss';

class AdminView extends React.Component {
	
	state = {
		user: {},
		page: 'dashboard',
		TrainingsPage: 'default',
		EmployeesPage: 'default',
		trainings: []
	};
	
	switchPage = () => {
		switch(this.state.page) {
			case 'dashboard':
				return <DashboardPage />
			case 'trainings':
				return <TrainingsPage
							changeSubPageState={this.changeSubPageState}
							addTraining={this.addTraining}
							TrainingsPage={this.state.TrainingsPage}
							user = {this.props.user}
							organization = {this.props.organization}
						/>
			case 'employees':
				return <EmployeesPage
							changeSubPageState={this.changeSubPageState}
							EmployeesPage={this.state.EmployeesPage}
							user = {this.props.user}
							organization = {this.props.organization}
						/>
			case 'reports':
				return <ReportsPage />
			case 'network':
				return <NetworkPage />
			default:
				return <DashboardPage />
		}
	};
	
	DashboardPage = () => {
// 		this.props.getDashboard();
	}
	
	TrainingsPage = () => {
		this.changePageState('trainings');
	}
	
	
	
	/* =========== Moved from App =========== */
	
	changePageState = (page) => {
		const state = this.state;
		state.page = page;
		state.TrainingsPage = 'default';
		state.EmployeesPage = 'default';
		this.setState(state);
	};
	
	//	Passed into Sub Pages
	changeSubPageState = (subPage, subPageState) => {
		const state = this.state;
		state[subPage] = subPageState;
// 		this.setState({ [subPage]: state });
		this.setState(state);
	};
	
	/* ===================================== */
	
	
	
	
	render() {
		return(
			<div className=''>
				<SideNav
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