import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import API from '../../utils/API';

class Login extends Component {
	
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			message: ''
		};
	}
	
	onChange = e => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	};
	
	onSubmit = e => {
		e.preventDefault();
		
		const { username, password } = this.state;
		
		/*
			Uses the /api/auth/login to attempt to find the username/password combo.
			If successful, sets the JWT Token for the user (retrieved from the back-end) inside of Local Storage.
			This token will be checked each time the user tries to visit a restricted page
		*/
		API.auth.login(username, password)
			.then(result => {
				localStorage.setItem('jwtToken', result.data.token);
				this.setState({ message: '' });
				console.log(result.data);
// 				this.props.history.push('/app')
				window.location.href=`/organization/${result.data.user.__organization.name.replace(' ', '')}`;
			})
			.catch(err => {
				if(err) console.log(err);
				if(err.response && err.response.status === 401) {
					this.setState({ message: 'Login failed. Username or password do not match.' });
				}
			});			
	}
	
	render() {
		const { username, password, message } = this.state;
		return (
			<div className=''>
				<h1><Link to='/'>Athena</Link></h1>
				<form className='' onSubmit={this.onSubmit}>
					{message !== '' &&
						<div className='' role='alert'>
							{ message }
						</div>
					}
					<h2 className=''>Login</h2>
					<label htmlFor='inputUsername' className=''>Username</label>
					<input type='text' className='' placeholder='Username' name='username' value={username} onChange={this.onChange} required />
					<label htmlFor='inputPassword' className=''>Password</label>
					<input type='password' className='' placeholder='Password' name='password' value={password} onChange={this.onChange} required />
					<button className='' type='submit'>Login</button>
					<p>
						Not a member? <Link to='/register'>Register here</Link>
					</p>
				</form>
			</div>
		);
	}
	
}

export default Login;