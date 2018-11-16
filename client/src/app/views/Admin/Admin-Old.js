import React from "react";
import "./Admin.css";

import { TrainingsDisplay, EmployeesDisplay, DashboardDisplay, ReportsDisplay, NetworkDisplay } from './displays';

import AdminHeader from '../components/AdminHeader';

class AdminView extends React.Component {
	
	state = {
		user: {},
		display: 'dashboard',
		trainingsDisplay: 'default',
		employeesDisplay: 'default',
		trainings: []
	};
	
	switchDisplay = () => {
		switch(this.state.display) {
			case 'dashboard':
				return <DashboardDisplay />
			case 'trainings':
				return <TrainingsDisplay
							changeSubDisplayState={this.changeSubDisplayState}
							addTraining={this.addTraining}
							trainingsDisplay={this.state.trainingsDisplay}
							user = {this.props.user}
							organization = {this.props.organization}
						/>
			case 'employees':
				return <EmployeesDisplay
							changeSubDisplayState={this.changeSubDisplayState}
							employeesDisplay={this.state.employeesDisplay}
							user = {this.props.user}
							organization = {this.props.organization}
						/>
			case 'reports':
				return <ReportsDisplay />
			case 'network':
				return <NetworkDisplay />
			default:
				return <DashboardDisplay />
		}
	};
	
	dashboardDisplay = () => {
// 		this.props.getDashboard();
	}
	
	trainingsDisplay = () => {
		this.changeDisplayState('trainings');
	}
	
	
	
	/* =========== Moved from App =========== */
	
	logout = () => {
		localStorage.removeItem('jwtToken');
		window.location.href='/login';
	};
	
	changeDisplayState = (display) => {
		const state = this.state;
		state.display = display;
		state.trainingsDisplay = 'default';
		state.employeesDisplay = 'default';
		this.setState(state);
	};
	
	//	Passed into Sub Displays
	changeSubDisplayState = (subDisplay, subDisplayState) => {
		const state = this.state;
		state[subDisplay] = subDisplayState;
// 		this.setState({ [subDisplay]: state });
		this.setState(state);
	};
	
/*
	getTrainings = () => {
		this.setState({ display: 'trainings' });
	};
*/
	//	Passed into Trainings Prop
	addTraining = () => {
		
	};
	
	/* ===================================== */
	
	
	
	
	render() {
		return(
			<div className=''>
				<header className=''>
					{
						(this.props.user && this.props.organization) &&
						<AdminHeader
							user={this.props.user}
							organization={this.props.organization}
							logout={this.logout}
						/>
					}
				</header>
				<br />
				<nav>
					<div onClick={() => this.changeDisplayState('dashboard')}>Dashboard</div>
					<div onClick={() => this.changeDisplayState('trainings')}>Trainings</div>
					<div onClick={() => this.changeDisplayState('employees')}>Employees</div>
					<div onClick={() => this.changeDisplayState('reports')}>Reports</div>
					<div onClick={() => this.changeDisplayState('network')}>Network</div>
				</nav>
				<div>
					{ this.switchDisplay() }
				</div>
			</div>
		);
	}
	
/*
	render() {
		return (
			<div className=''>
				<header className=''>
					<h3>Admin Display</h3>
					{
						(this.props.user && this.props.organization) &&
						<div>
							<h1>{this.props.organization.name}</h1>
							<h2>Hello, {this.props.user.username}</h2>
						</div>
					}
						<span className='' onClick={this.props.logout}>Logout</span>
				</header>
				<br />
				<nav>
					<div onClick={() => this.props.changeDisplayState('display', 'dashboard')}>Dashboard</div>
					<div onClick={this.trainingsDisplay}>Trainings</div>
					<div onClick={() => this.props.changeDisplayState('display', 'employees')}>Employees</div>
					<div onClick={() => this.props.changeDisplayState('display', 'reports')}>Reports</div>
					<div onClick={() => this.props.changeDisplayState('display', 'network')}>Network</div>
				</nav>
				<div>
					{ this.switchDisplay(this.props.display) }
				</div>
			</div>
		);
	}
*/
}

export default AdminView;

/*
				<header className=''>
					{
						(this.state.user && this.state.user.__organization) &&
						<div>
							<h1>{this.state.user.__organization.name}</h1>
							<h2>Hello, {this.state.user.username}</h2>
						</div>
					}
						<div className='' onClick={this.logout}>Logout</div>
					<h3>Trainings &nbsp;</h3>
				</header>
				<div className=''>
					<table className=''>
						<thead>
							<tr>
								<th>Training</th>
							</tr>
						</thead>
						<tbody>
							{this.state.trainings.map(training =>
								<tr key={training._id}>
									<td><Link 
											to={`/trainings/${training._id}`}
										>{training.name}
										</Link>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
*/