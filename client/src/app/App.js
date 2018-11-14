import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import API from '../utils/API';

import './App.css';

// import { UserView, AdminView } from './views';
import UserView from './views/User/User.js';
import AdminView from './views/Admin/Admins.js';

class App extends Component {
	
/*
	constructor(props) {
		super(props);
		this.state = {
			user: {},
		};
	}
*/
	state = {
		user: {}
	};
	
	componentDidMount() {
		/*
			If the /api/trainings API call comes back with a 401 (unauthorized) error, "redirect" to /login
		*/
		if(localStorage.getItem('jwtToken')) {
			API.trainings.getTrainings().then(res => {
// 				console.log('response received, user: ', res.data.user);
				this.setState({ trainings: res.data.trainings, user: res.data.user });
			})
			.catch(err => {
				if(err.response && err.response.status === 401) {
// 					this.props.history.push('/login');
					window.location.href='/login';
				} else if(err.response && err.response.status === 404) {
					console.log('OH NO! Page not found!');
				}
			});
		} else {
			window.location.href='/login';
		}
	}
	
	logout = () => {
		localStorage.removeItem('jwtToken');
		window.location.href='/login';
	};
	
/*
	logout = () => {
// 		this.state.user = {};
		localStorage.removeItem('jwtToken');
// 		window.location.reload();
		window.location.href='/login';
	};
	
	changeDisplayState = (display, displayState) => {
		const state = this.state;
		state[display] = displayState;
		state.trainingsDisplay = 'default';
		this.setState(state);
	};
	
	changeSubDisplayState = (subDisplay, state) => {
		this.setState({ [subDisplay]: state });
	};
	
	getTrainings = () => {
		this.setState({ display: 'trainings' });
	};
	
	addTraining = () => {
		
	};
*/
	
	render() {
		return (
			<div>
			{(localStorage.getItem('jwtToken') && this.state.user.role > 1)
				?
					<AdminView user={this.state.user} organization={this.state.user.__organization} logout={this.logout} />
				: (localStorage.getItem('jwtToken') && this.state.user.role == 1)
				?
					<UserView logout={this.logout} />
				:
// 				Insert Loading Image Here if wanted (get rid of null value if you do)
				null
			}
			</div>
		);
/*
		return(
			<Router>
				<Switch>
					<Route path='/:org' component={() => <AdminView user={this.state.user} organization={this.state.user.__organization} logout={this.logout} />} />
					<Route path='/user' componenet={() => <UserView logout={this.logout} />} />
				</Switch>
			</Router>
		);
*/
	}
	
/*
	render() {
		return (
			<div>
			{(localStorage.getItem('jwtToken') && this.state.user.role > 1)
				?
					<AdminView
						user={this.state.user}
						organization={this.state.user.__organization}
						display={this.state.display}
						trainingsDisplay={this.state.trainingsDisplay}
						logout={this.logout}
						changeDisplayState={this.changeDisplayState}
						changeSubDisplayState={this.changeSubDisplayState}
						getTrainings={this.getTrainings}
					/>
				: (localStorage.getItem('jwtToken') && this.state.user.role == 1)
				?
					<UserView />
				:
// 				Insert Loading Image Here if wanted (get rid of null value if you do)
				null
			}
			</div>
		);
	}
*/
}

export default App;
