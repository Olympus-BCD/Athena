import React from "react";
import { Link } from 'react-router-dom';
import "./ViewEmployee.css";
import API from '../../../../../../../utils/API';

class ViewEmployee extends React.Component {
	
	state = {
		message: ''
	};

	render() {
		return (
			<div>
				<Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees`}>X</Link>
				<h3>Employee</h3>
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				<div>{this.props.id}</div>
			</div>
		);
	}
}

export default ViewEmployee;