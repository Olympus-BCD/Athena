import React from "react";
import { Link } from 'react-router-dom';
import "./AddTraining.css";
import API from '../../../../../../../utils/API';

import TrainingsForm from '../../../../../components/TrainingsForm';
import MessageModal from '../../../../../components/MessageModal';

// Materialize Imports
import { Row, Input } from "react-materialize";
import TrainingsSubHeader from "../../TrainingsSubHeader/TrainingsSubHeader";
import UploadDocAddTrain from "../../../../../components/UploadDocAddTrain/UploadDocAddTrain"


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

	closeMessageModal = () => {
		this.setState({ message: '' })
	};

	render() {
		const { training, addTrainingToExistingUsers } = this.state
		return (
			<div>
				<TrainingsSubHeader organization={this.props.organization} />
				{/* <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings`}><i class=" back material-icons">arrow_back</i></Link> */}
			
				<div className = "container">
				   <div id = "addTrainingCard" className = "card">
				     <div className = "row">
					   <div className = "col s12">
					   <span className = "card-title">
					      <h3>Add Training</h3>
						  {
							this.state.message !== '' &&
							<MessageModal message={this.state.message} closeMessageModal={this.closeMessageModal} />
						  }
					   </span>
					   </div>
					   </div>
					
					   <div id = "addTrainingForm" className = "card">
					   <div className = "card-content">
					   <form>
					    <Row>
							<Input s={12}  label='Training Name' type='text' name='name' onChange={this.onChange} value={training.name} required />
					    </Row>
						<Row>
							<Input s={6} label='Training Code' type='text' name='trainingCode'	onChange={this.onChange} value={training.trainingCode} />
						    <Input s={6} label='Training Hours' type='number' name='hours' value={training.hours} onChange={this.onChange} placeholder='-' />
						</Row>
						{/*<Input name='trackHours' type='checkbox' value={training.trackHours} checked={training.trackHours ? 'checked' : null} label='Add Training Hours' onClick={this.toggleCheckbox} />
						{
							training.trackHours &&
							<Input type='number' name='hours' value={training.hours} onChange={this.onChange} placeholder='Training Hours...' />
						}*/}
						<Row>
						<Input  name='requiredOnboarding' type='checkbox' value={training.requiredOnboarding} checked={training.requiredOnboarding ? 'checked' : null} label='Is this training required by new employees?' onClick={this.toggleCheckbox} />
						</Row>
						<Row>
						<Input s={6} name='recurring' type='checkbox' value={training.recurring} checked={training.recurring ? 'checked' : null} label='Is this training recurring?' onClick={this.toggleCheckbox} />
						
						{
							training.recurring &&
							<div className = "col s6">
							<p>This training is required every
								<Input s={3} name='frequencyNumber' type='number' value={training.frequencyNumber} onChange={this.onChange} />
								<Input s={3} name='frequencyPeriod' type='select' defaultValue={training.frequencyPeriod} onChange={this.onChange}>
									<option value='day'>{training.frequencyNumber == 1 ? 'Day' : 'Days'}</option>
									<option value='month'>{training.frequencyNumber == 1 ? 'Month' : 'Months'}</option>
									<option value='year'>{training.frequencyNumber == 1 ? 'Year' : 'Years'}</option>
								</Input>
							</p>
							</div>
						}
						</Row>
						<Row>
						<Input name='addTrainingToExistingUsers' type='checkbox' value={addTrainingToExistingUsers} checked={addTrainingToExistingUsers ? 'checked' : null} label='Add this training to all existing users?' onClick={this.toggleAddTrainingToExistingUsers} />
						<div className = " col s12 center uploadArea">
					    <UploadDocAddTrain />
						</div>
						</Row>
						
						
						<button id = "addTraining" className = "waves-effect waves-light btn" onClick={this.addTraining}>Add Training</button>
					</form>
					</div>
					</div>
					
					</div>
				</div>
				
				
				
				
			</div>
		);
	}
}

export default AddTraining;