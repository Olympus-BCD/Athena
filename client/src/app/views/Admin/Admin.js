import React from "react";
import "./Admin.css";

import { TrainingsDisplay, EmployeesDisplay, DashboardDisplay, ReportsDisplay, NetworkDisplay } from './displays';

class AdminView extends React.Component {
	
	switchDisplay = display => {
		switch(display) {
			case 'dashboard':
				return <DashboardDisplay />
			case 'trainings':
				return <TrainingsDisplay
							addTrainings={this.props.addTraining}
						/>
			case 'employees':
				return <EmployeesDisplay />
			case 'reports':
				return <ReportsDisplay />
			case 'network':
				return <NetworkDisplay />
			default:
				return <DashboardDisplay />
		}
	};
	
	dashboardDisplay = () => {
		this.props.getDashboard();
	}
	
	trainingsDisplay = () => {
		this.props.changeDisplayState('trainings');
	}
	
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
					<div onClick={() => this.props.changeDisplayState('dashboard')}>Dashboard</div>
					<div onClick={this.trainingsDisplay}>Trainings</div>
					<div onClick={() => this.props.changeDisplayState('employees')}>Employees</div>
					<div onClick={() => this.props.changeDisplayState('reports')}>Reports</div>
					<div onClick={() => this.props.changeDisplayState('network')}>Network</div>
				</nav>
				<div>
					{ this.switchDisplay(this.props.display) }
				</div>
			</div>
		);
	}
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