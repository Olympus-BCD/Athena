import React from "react";
import "./Employees.css";

import API from '../../../../../utils/API';
import crypto from 'crypto';
import rs from 'randomstring';	//	rs.generate(8)

class EmployeesDisplay extends React.Component {
	
	state = {
		display: 'default',
		message: '',
		newEmployee: {
			fname: '',
			lname: '',
			employeeID: '',
			username: this.props.usernamePrefix
				? this.props.usernamePrefix + '_' + crypto.randomBytes(2).toString('hex')
				: crypto.randomBytes(3).toString('hex'),
			password: this.props.passwordDefault || crypto.randomBytes(4).toString('hex')
		},
		currentEmployee: {},
		employees: []
	};
	
	componentDidMount() {
		this.getEmployees();
	}
	
	switchEmployeeDisplay = () => {
		switch(this.props.employeesDisplay) {
			case 'addEmployee':
				return 	<form>
							<label htmlFor='fnameInput' className=''>First Name</label>
							<input type='text' name='fname' onChange={this.onChange} value={this.state.newEmployee.fname} />
							
							<label htmlFor='lnameInput' className=''>Last Name</label>
							<input type='text' name='lname' onChange={this.onChange} value={this.state.newEmployee.lname} />
							
							<label htmlFor='employeeIDInput' className=''>Employee ID</label>
							<input type='text' name='employeeID' onChange={this.onChange} value={this.state.newEmployee.employeeID} />
							
							<label htmlFor='usernameInput' className=''>Username</label>
							<input type='text' name='username' onChange={this.onChange} value={this.state.newEmployee.username} />
							
							<label htmlFor='passwordInput' className=''>Password</label>
							<input type='text' name='password' onChange={this.onChange} value={this.state.newEmployee.password} />
							
							<button onClick={this.addEmployee}>Add Employee</button>
						</form>
			case 'viewEmployee':
				return	<div>
							<div onClick={() => this.props.changeSubDisplayState('employeesDisplay', 'default')} >Back</div>
							<h4>{this.state.currentEmployee.username}</h4>
						</div>
			default:
				return <div className=''>
							<table className=''>
								<thead>
									<tr>
										<th>Employee</th>
									</tr>
								</thead>
								<tbody>
									{this.state.employees.map(employee =>
										<tr key={employee._id} onClick={() => { this.showEmployee(employee) }} >
											<td>{employee.username}</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
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
		const { newEmployee } = this.state;
		newEmployee.__organization = this.props.organization._id;
		API.auth.register(newEmployee).then(res => {
			if(res.data.success) {
				console.log(res.data);
				this.props.changeSubDisplayState('employeesDisplay', 'default');
				this.setState({
					newEmployee: {
						fname: '',
						lname: '',
						employeeID: '',
						__organization: '',
						username: this.props.usernamePrefix
							? this.props.usernamePrefix + '_' + crypto.randomBytes(2).toString('hex')
							: crypto.randomBytes(3).toString('hex'),
						password: this.props.passwordDefault || crypto.randomBytes(4).toString('hex')
					}
				});
				this.getEmployees();
			} else {
				console.log(res.data.msg);
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			if(err) this.setState({ message: err._message });
		});
	};
	
	getEmployees = () => {
		const query = {
			__organization: this.props.organization._id
		};
		API.auth.getUsers(query).then(res => {
			if(res.data.success) {
				console.log(res.data.users);
				this.setState({ employees: res.data.users });
				this.props.changeSubDisplayState('employeesDisplay', 'default');
			} else {
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			this.setState({ message: err._message });
		});
	};
	
	showEmployee = employee => {
		this.setState({ currentEmployee: employee });
		this.props.changeSubDisplayState('employeesDisplay', 'viewEmployee');
	};
	
	render() {
		const { message } = this.state;
		return (
			<div>
				<h3>Employees Display</h3>
				{message !== '' &&
					<div className='' role='alert'>
						{ message }
					</div>
				}
				<div onClick={() => { this.props.changeSubDisplayState('employeesDisplay', 'addEmployee') }}>Add Employee</div>
				<div onClick={() => { this.props.changeSubDisplayState('employeesDisplay', 'default') }}>Show Employees</div>
				{ this.switchEmployeeDisplay() }
			</div>
		);
	}
}

export default EmployeesDisplay;