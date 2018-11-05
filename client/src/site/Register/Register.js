import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

import API from '../../utils/API';

class Register extends Component {
	
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
	}
	
	onSubmit = e => {
		e.preventDefault();
		
		const { username, password } = this.state;
		
		API.auth.register(username, password)
			.then(result => {
				API.auth.login(username, password)
					.then(result => {
						localStorage.setItem('jwtToken', result.data.token);
						this.setState({ message: '' });
		// 				this.props.history.push('/app')
						window.location.href='/app';
					})
					.catch(err => {
						if(err) console.log(err);
						if(err.response.status === 401) {
							this.setState({ message: 'Registration failed.' });
						}
					});
				//
			})
			.catch(err => {
				if(err) console.log('Error registering user POST');
			});
		//
	}
	
	render() {
		const { username, password, message } = this.state;
		return(
			<div className=''>
				<h1><Link to='/'>Athena</Link></h1>
				<form className='' onSubmit={this.onSubmit}>
					{message !== '' &&
						<div className='' role='alert'>
							{ message }
						</div>
					}
					<h2 className=''>Register</h2>
					<label htmlFor='inputUsername' className=''>Username</label>
					<input type='text' className='' placeholder='Username' name='username' value={username} onChange={this.onChange} required />
					<label htmlFor='inputPassword' className=''>Password</label>
					<input type='password' className='' placeholder='Password' name='password' value={password} onChange={this.onChange} required />
					<button className='' type='submit'>Register</button>
				</form>
				<p>
					Already a member? <Link to='/login'>Login here</Link>
				</p>
			</div>
		);
	}
}

export default Register;