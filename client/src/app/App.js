import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/API';

import './App.css';

import { MemberDisplay, AdminDisplay } from './displays';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			user: {},
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
	
	render() {
		/*
			If the page is rendered with a JWT Token, include a Logout button
		*/
		return (
			<div>
			{(localStorage.getItem('jwtToken') && this.state.user.role > 1)
				?
					<AdminDisplay
						user={this.state.user}
						organization={this.state.user.__organization}
						logout={this.logout}
					/>
				: (localStorage.getItem('jwtToken') && this.state.user.role == 1)
				?
					<MemberDisplay />
				:
// 				Insert Loading Image Here if wanted
				null
			}
			</div>
		);
	}
}

export default App;
