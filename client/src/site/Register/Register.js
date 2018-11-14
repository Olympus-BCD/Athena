import React, { Component } from 'react';
import { Link } from 'react-router-dom';



import './Register.css';

import API from '../../utils/API';

class Register extends Component {
	
	constructor() {
		super();
		this.state = {
			organization: '',
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
		
		const { organization, username, password } = this.state;
		//	TODO:	Create an API call that just performs validations for all 3, so that an organization does not get created if a user doesn't and vice versa
		//	e.g.,	API.organization.checkValidations(organization, username, password) or two separate calls API.organization.validations() and API.auth.validations()
		API.organization.register(organization)
			.then(res => {
				if(res.data.success) {
					const user = {
						username: username,
						password: password,
						role: 3,
						__organization: res.data.organization._id
					};
					const newOrganization = res.data.organization;
					API.auth.register(user)
						.then(result => {
							if(result.data.success) {
								const newUser = result.data.user;
								API.organization.addOwner(newOrganization, newUser)
									.then(result => {
										if(result.data.success) {
											API.auth.login(username, password)
												.then(result => {
													if(result.data.success) {
														localStorage.setItem('jwtToken', result.data.token);
														this.setState({ message: '' });
// 														this.props.history.push('/app')
														window.location.href=`/${res.data.organization.name.replace(' ', '')}}`;
													} else {
														this.setState({ message: result.data.msg });
													}
												})
												.catch(err => {
													if(err) console.log(err);
													if(err.response.status === 401) {
														this.setState({ message: 'Error logging in user.' });
// 														this.setState({ message: 'Registration failed.' });
													}
												});
											//
										} else {
											this.setState({ message: result.data.msg });
										}
									})
									.catch(err => {
										if(err) console.log('Error adding owner to organization POST', err);
									});
								//
							} else {
								this.setState({ message: result.data.msg })
							}
						})
						.catch(err => {
							if(err) console.log('Error registering new user POST', err);
						});
					//
				} else {
					this.setState({ message: res.data.msg });
				}
			})
			.catch(err => {
				if(err) console.log('Error registering new organization POST', err);
			});
		//
	}
	
	render() {
		const { organization, username, password, message } = this.state;
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
					<label htmlFor='inputOrganization' className=''>Name of Organization</label>
					<input type='text' className='' placeholder='Organization' name='organization' value={organization} onChange={this.onChange} required />
					<label htmlFor='inputUsername' className=''>Username</label>
					<input type='text' className='' placeholder='Username' name='username' value={username} onChange={this.onChange} required />
					<label htmlFor='inputPassword' className=''>Password</label>
					<input type='password' className='' placeholder='Password' name='password' value={password} onChange={this.onChange} required />
					<button className='' type='submit'>Create My Organization!</button>
				</form>
				<p>
					Already a member? <Link to='/login'>Login here</Link>
				</p>
			</div>
		);
	}
}

export default Register;