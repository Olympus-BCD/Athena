import React from "react";
import { Link } from 'react-router-dom';
import "./AddTraining.css";
import API from '../../../../../../../utils/API';

import TrainingsForm from '../../../../../components/TrainingsForm';

class AddTraining extends React.Component {
	
	state = {
		message: '',
		training: {}
	};
	
	onChange = e => {
		const { name, value } = e.target;
		const state = this.state;
		state.training[name] = value;
		this.setState(state);
	};
	
	addTraining = (e) => {
		e.preventDefault();
		const { training } = this.state;
		training.__creator = this.props.user._id;
		training.__organization = this.props.organization._id;
		API.trainings.addTraining(training).then(results => {
// 			const training = results.data;
// 			this.setState({ message: 'Training Added!' });
			this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/trainings`);
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};

	render() {
		return (
			<div>
			<TrainingsForm />
				<Link to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings`}>X</Link>
				<h3>Add Training</h3>
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				<form>
					<input type='text' name='name' onChange={this.onChange} value={this.state.training.name} />
					<button onClick={this.addTraining}>Add Training</button>
				</form>
			</div>
		);
	}
}

export default AddTraining;