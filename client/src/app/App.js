import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/API';

import './App.css';

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
			If the /api/trainings API call comes back with a 401 (unauthorized) error, redirect to /login
		*/
		API.trainings.getTrainings().then(res => {
// 			console.log('response received, user: ', res.data.user);
			this.setState({ trainings: res.data.trainings, user: res.data.user });
		})
		.catch(err => {
			if(err.response.status === 401) {
// 					this.props.history.push('/login');
				window.location.href='/login';
			} else if(err.response.status === 404) {
				console.log('OH NO! Page not found!');
			}
		});
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
			<div className=''>
				<header className=''>
					{
						this.state.user &&
						<h2>Hello, {this.state.user.username}</h2>
					}
					{
						localStorage.getItem('jwtToken') &&
						<div className='' onClick={this.logout}>Logout</div>
					}
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
			</div>
		);
	}
}

export default App;
