import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/API';

import './App.css';

import { MemberView, AdminView } from './views';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			display: 'dashboard',
			trainings: []
		};
	}
	
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
// 		this.state.user = {};
		localStorage.removeItem('jwtToken');
// 		window.location.reload();
		window.location.href='/login';
	}
	
	changeDisplayState = display => {
		this.setState({ display: display });
	}
	
	getTrainings = () => {
		this.setState({ display: 'trainings' });
	};
	
	addTraining = () => {
		
	}
	
	render() {
		return (
			<div>
			{(localStorage.getItem('jwtToken') && this.state.user.role > 1)
				?
					<AdminView
						user={this.state.user}
						organization={this.state.user.__organization}
						display={this.state.display}
						logout={this.logout}
						changeDisplayState={this.changeDisplayState}
						getTrainings={this.getTrainings}
					/>
				: (localStorage.getItem('jwtToken') && this.state.user.role == 1)
				?
					<MemberView />
				:
// 				Insert Loading Image Here if wanted (get rid of null value if you do)
				null
			}
			</div>
		);
	}
}

export default App;
