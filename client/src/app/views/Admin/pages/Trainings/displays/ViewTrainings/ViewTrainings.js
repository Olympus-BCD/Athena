import React from "react";
import { Link } from 'react-router-dom';
import "./ViewTrainings.css";
import API from '../../../../../../../utils/API';

class ViewTrainings extends React.Component {
	
	state = {
		message: '',
		trainings: []
	};
	
	componentDidMount() {
		this.getTrainings();
	}
	
	getTrainings = () => {
		const query = {
			__organization: this.props.organization._id
		};
		API.trainings.getTrainings(query).then(results => {
			this.setState({ trainings: results.data.trainings });
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh oh! Something went wrong!' });
		});
	};
	
	render() {
		return (
			<div>
				<h3>Trainings Page</h3>
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				{this.state.trainings.map(training =>
					<div key={training._id}><Link to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings?id=${training._id}`}>{training.name}</Link></div>
				)}
			</div>
		);
	}
}

export default ViewTrainings;