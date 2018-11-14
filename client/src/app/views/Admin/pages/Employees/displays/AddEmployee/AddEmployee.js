import React from "react";
import { Link } from 'react-router-dom';
import "./AddEmployee.css";
import API from '../../../../../../../utils/API';

import crypto from 'crypto';

class AddEmployee extends React.Component {
	
	state = {
		message: '',
		employee: {
			fname: '',
			lname: '',
			employeeID: '',
			username: this.props.organization.usernamePrefix
				? this.props.organization.usernamePrefix + '_' + crypto.randomBytes(2).toString('hex')
				: crypto.randomBytes(3).toString('hex'),
			password: this.props.organization.passwordDefault || crypto.randomBytes(4).toString('hex')
		}
	};
	
	onChange = e => {
		const { name, value } = e.target;
		const state = this.state;
		state.newEmployee[name] = value;
		this.setState(state);
	};
	
	addEmployee = (e) => {
		e.preventDefault();
		const { employee } = this.state;
		employee.__organization = this.props.organization._id;
		API.auth.register(employee).then(res => {
			if(res.data.success) {
				this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/employees`);
			} else {
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			if(err) this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};

	render() {
		return (
			<div>
				<Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees`}>X</Link>
				<h3>Add Employee</h3>
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				<form>
					<label htmlFor='fnameInput' className=''>First Name</label>
					<input type='text' name='fname' onChange={this.onChange} value={this.state.employee.fname} />
					
					<label htmlFor='lnameInput' className=''>Last Name</label>
					<input type='text' name='lname' onChange={this.onChange} value={this.state.employee.lname} />
					
					<label htmlFor='employeeIDInput' className=''>Employee ID</label>
					<input type='text' name='employeeID' onChange={this.onChange} value={this.state.employee.employeeID} />
					
					<label htmlFor='usernameInput' className=''>Username</label>
					<input type='text' name='username' onChange={this.onChange} value={this.state.employee.username} />
					
					<label htmlFor='passwordInput' className=''>Password</label>
					<input type='text' name='password' onChange={this.onChange} value={this.state.employee.password} />
					
					<button onClick={this.addEmployee}>Add Employee</button>
				</form>
			</div>
		);
	}
}

export default AddEmployee;