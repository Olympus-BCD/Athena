import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import API from '../utils/API';

import './App.css';

import { UserView, AdminView } from './views';

class App extends Component {
	
	state = {
		user: {}
	};
	
	componentDidMount() {
		/*
			If the /api/trainings API call comes back with a 401 (unauthorized) error, "redirect" to /login
		*/
		if(localStorage.getItem('jwtToken')) {
			//	replace with system status check API call (check training hours overdue)
			API.trainings.getTrainings().then(res => {
// 				console.log('response received, user: ', res.data.user);
				console.log('From App...');
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
	
	render() {
		return (
			<div className="app-wrapper">
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
	}
}

export default App;
