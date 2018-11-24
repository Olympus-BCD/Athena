import React from "react";
import { Link } from 'react-router-dom';
import "./AddTraining.css";
import API from '../../../../../../../utils/API';

import TrainingsForm from '../../../../../components/TrainingsForm';

// Materialize Imports
import { Row, Input } from "react-materialize";


class AddTraining extends React.Component {
	
	state = {
		message: '',
		training: {
			name: '',
			traningCode: '',
// 			trackHours: false,
			hours: 0,
			requiredOnboarding: false,
			recurring: false,
			frequencyNumber: 1,
			frequencyPeriod: 'year'
		},
		addTrainingToExistingUsers: false
	};
	
	onChange = e => {
		const { name, value } = e.target;
		const { training } = this.state;
		training[name] = value;
		training.hours = training.hours < 0 ? 0 : training.hours;
		this.setState({training: training});
	};
	
	toggleCheckbox = e => {
// 		e.preventDefault();
		const { name } = e.target;
		const { training } = this.state;
		training[name] = !training[name];
		this.setState({ training: training });
	};
	
	toggleAddTrainingToExistingUsers = e => {
// 		e.preventDefault();
		const state = this.state;
		state.addTrainingToExistingUsers = state.addTrainingToExistingUsers ? false : true;
		this.setState(state);
	};
	
	addTraining = (e) => {
		e.preventDefault();
		const { training } = this.state;
		training.__creator = this.props.user._id;
		training.__organization = this.props.organization._id;
		training.frequencyNumber = training.frequencyNumber < 1 ? 1 : training.frequencyNumber;
// 		return console.log('New Training:', training, 'Add this training to all existing users?', this.state.addTrainingToExistingUsers);
		
		/*
			TODO:	Validations
			Front-End:
				*	Required Fields (name, hours, frequencyNumber, frequencyPeriod)
				*	Name - Length, trim, no special chars?	
			Back-End:
				*	All the above
				*	Unique Training Name
				
			TODO:	Change JSON Response to include success: true/false with error msg if applicable (all training APIs should be setup this way)
		*/
		API.trainings.addTraining(training).then(results => {
// 			const training = results.data;
// 			this.setState({ message: 'Training Added!' });
			if(results.data.success) {
				if(this.state.addTrainingsToExistingUsers) {
					API.auth.addTrainingToExistingUsers(training).then(results => {
						if(results.data.success) {
							console.log('Trainings Updated!');
							this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/trainings`);
						} else {
							this.setState({ message: 'Training created, but not added to all employees.' });
						}
					}).catch(err => {
						this.setState({ message: 'Uh Oh! Something went wrong!' });
					});
				} else {
					this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/trainings`);
				}
			} else {
				this.setState({ message: results.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};

	render() {
		const { training, addTrainingToExistingUsers } = this.state
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
					<Input label='Training Name' type='text' name='name' onChange={this.onChange} value={training.name} required />
					<Input label='Training Code' type='text' name='trainingCode'	onChange={this.onChange} value={training.trainingCode} />
					{/*<Input name='trackHours' type='checkbox' value={training.trackHours} checked={training.trackHours ? 'checked' : null} label='Add Training Hours' onClick={this.toggleCheckbox} />
					{
						training.trackHours &&
						<Input type='number' name='hours' value={training.hours} onChange={this.onChange} placeholder='Training Hours...' />
					}*/}
					<Input label='Training Hours' type='number' name='hours' value={training.hours} onChange={this.onChange} placeholder='-' />
					<Input name='requiredOnboarding' type='checkbox' value={training.requiredOnboarding} checked={training.requiredOnboarding ? 'checked' : null} label='Is this training required by new employees?' onClick={this.toggleCheckbox} />
					<Input name='recurring' type='checkbox' value={training.recurring} checked={training.recurring ? 'checked' : null} label='Is this training recurring?' onClick={this.toggleCheckbox} />
					{
						training.recurring &&
						<p>This training is required every
							<Input name='frequencyNumber' type='number' value={training.frequencyNumber} onChange={this.onChange} />
							<Input name='frequencyPeriod' type='select' defaultValue={training.frequencyPeriod} onChange={this.onChange}>
								<option value='day'>{training.frequencyNumber == 1 ? 'Day' : 'Days'}</option>
								<option value='month'>{training.frequencyNumber == 1 ? 'Month' : 'Months'}</option>
								<option value='year'>{training.frequencyNumber == 1 ? 'Year' : 'Years'}</option>
							</Input>
						</p>
					}
					<Input name='addTrainingToExistingUsers' type='checkbox' value={addTrainingToExistingUsers} checked={addTrainingToExistingUsers ? 'checked' : null} label='Add this training to all existing users?' onClick={this.toggleAddTrainingToExistingUsers} />
					<p>Add documents to this training</p>
					<button onClick={this.addTraining}>Add Training</button>
				</form>
			</div>
		);
	}
}

export default AddTraining;