import React from "react";
import { Link } from 'react-router-dom';
import "./ViewEmployees.css";
import API from '../../../../../../../utils/API';

class ViewEmployees extends React.Component {
	
	state = {
		message: '',
		employees: []
	};
	
	componentDidMount() {
		this.getEmployees();
	}

	getEmployees = () => {
		const query = {
			__organization: this.props.organization._id
		};
		API.auth.getUsers(query).then(res => {
			if(res.data.success) {
				this.setState({ employees: res.data.users });
			} else {
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	render() {
		return (
			<div>
				<h3>Employees</h3>
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				{this.state.employees.map(employee =>
					<div key={employee._id}><Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${employee._id}`} >{employee.username}</Link></div>
				)}
			</div>
		);
	}
}

export default ViewEmployees;