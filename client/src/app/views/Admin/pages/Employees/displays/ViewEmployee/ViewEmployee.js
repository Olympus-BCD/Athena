import React from "react";
import { Link } from 'react-router-dom';
import "./ViewEmployee.css";
import API from '../../../../../../../utils/API';
import EmployeesSubHeader from '../../EmployeesSubHeader';

class ViewEmployee extends React.Component {
	
	state = {
		message: '',
		employee: { trainings: [] },
		editEmployee: {},
		editName: false,
		editUsername: false,
		editEmployeeID: false,
		editTitle: false,
		editRole: false
	};
	
	componentDidMount() {
		this.getEmployee();
	}
	
	onChange = e => {
		const { name, value } = e.target;
		const state = this.state;
		state.editEmployee[name] = value;
		this.setState(state);
	};
	
	onSubmit = e => {
		e.preventDefault();
// 		this.setState({ editName: false, employee: Object.assign({}, this.state.editEmployee ) });
		API.auth.update(this.state.editEmployee).then(response => {
			if(response.data.success) {
				const user = response.data.user;
				this.setState({
					employee: user, editEmployee: Object.assign({}, user),
					editName: false,
					editUsername: false,
					editEmployeeID: false,
					editTitle: false,
					editRole: false
				});
			} else {
				this.setState({ message: response.data.msg });
			}
		}).catch(err => {
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	cancel = () => {
		const { employee } = this.state;
		this.setState({
			editEmployee: Object.assign({}, employee),
			editName: false,
			editUsername: false,
			editEmployeeID: false,
			editTitle: false,
			editRole: false
		});
	};
	
	getEmployee = () => {
		const query = {
			id: this.props.id
		};
		API.auth.findById(query).then(results => {
			if(results.data.success) {
				const employee = results.data.user
				console.log('Employee: ', employee);
				this.setState({ employee: employee, editEmployee: Object.assign({}, employee) });
			} else {
				this.setState({ message: results.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/employees`);
// 			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	employeeRole = () => {
		switch(this.state.employee.role) {
			case 3:
				return 'Owner';
			case 2:
				return 'Admin';
			case 1:
				return 'User';
			default:
				return 'N/A';
		}
	};

	render() {
		const { message, employee, editEmployee } = this.state;
		return (
			<div>
				<EmployeesSubHeader organization={this.props.organization} search={false} addEmployee={true} />
				<h3>{employee.fname}</h3>
				{
					message !== '' &&
					<div>{message}</div>
				}
				{
					this.state.editName
					?	<form onSubmit={this.onSubmit}>
							<input type='text' name='fname' value={editEmployee.fname} onChange={this.onChange} />
							<input type='text' name='lname' value={editEmployee.lname} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
						</form>
					:	<div>
							<span>Name: {(employee.fname && employee.lname) ? `${employee.fname} ${employee.lname}` : 'unknown'}</span>&nbsp;
							<span onClick={() => this.setState({ editName: true })}>( EditIcon )</span>
						</div>
				}
				{
					this.state.editUsername
					?	<form onSubmit={this.onSubmit}>
							<input type='text' name='username' value={editEmployee.username} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
						</form>
					:	<div>
							<span>Username: {employee.username}</span>
							<span onClick={() => this.setState({ editUsername: true })}>( EditIcon )</span>
						</div>
				}
				{
					this.state.editEmployeeID
					?	<form onSubmit={this.onSubmit}>
							<input type='text' name='employeeID' value={editEmployee.employeeID} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
						</form>
					:	<div>
							<span>Employee ID: {employee.employeeID}</span>
							<span onClick={() => this.setState({ editEmployeeID: true })}>( EditIcon )</span>
						</div>	
				}
				{
					this.state.editTitle
					?	<form onSubmit={this.onSubmit}>
							<input type='text' name='title' value={editEmployee.title} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
						</form>
					:	<div>
							<span>Title: {employee.title}</span>
							<span onClick={() => this.setState({ editTitle: true })}>( EditIcon )</span>
						</div>	
				}
				<div>Role: {this.employeeRole()}</div>
				
				{employee.trainings.length > 0
					?
						<ul>Trainings:
							{employee.trainings.map((training, i) => 
								<li>
									<div>{training.name}</div>
								</li>
							)}
						</ul>
					:
						<div>No Trainings Assigned :(</div>
				}
			</div>
		);
	}
}

export default ViewEmployee;