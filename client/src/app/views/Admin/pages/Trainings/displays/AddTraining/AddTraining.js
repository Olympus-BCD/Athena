import React from "react";
import { Link } from 'react-router-dom';
import "./AddTraining.css";
import API from '../../../../../../../utils/API';

class AddTraining extends React.Component {
	
	state = {
		message: '',
		training: ''
	};
	
	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	
	addTraining = (e) => {
		e.preventDefault();
		const newTraining = {
			name: this.state.training,
			__creator: this.props.user._id,
			__organization: this.props.organization._id
		};
		API.trainings.addTraining(newTraining).then(results => {
			const training = results.data;
// 			this.setState({ message: 'Training Added!' });
			this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/trainings`);
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh oh! Something went wrong!' });
		});
	};

	render() {
		return (
			<div>
				<Link to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings`}>X</Link>
				<h3>Add Training</h3>
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				<form>
					<input type='text' name='training' onChange={this.onChange} value={this.state.training} />
					<button onClick={this.addTraining}>Add Training</button>
				</form>
			</div>
		);
	}
}

export default AddTraining;