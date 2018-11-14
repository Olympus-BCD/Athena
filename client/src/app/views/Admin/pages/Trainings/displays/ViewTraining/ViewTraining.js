import React from "react";
import { Link } from 'react-router-dom';
import "./ViewTraining.css";
import API from '../../../../../../../utils/API';

class ViewTraining extends React.Component {
	
	state = {
		message: ''
	};

	render() {
		return (
			<div>
				<Link to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings`}>X</Link>
				<h3>Training</h3>
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				<div>{this.props.id}</div>
			</div>
		);
	}
}

export default ViewTraining;