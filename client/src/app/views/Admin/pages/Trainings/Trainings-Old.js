import React from "react";
import "./Trainings.css";

import API from '../../../../../utils/API';

class TrainingsDisplay extends React.Component {
	
	state = {
		display: 'default',
		newTraining: '',
		trainings: []
	};
	
	componentDidMount() {
		this.getTrainings();
	}
	
	switchTrainingDisplay = () => {
		switch(this.props.trainingsDisplay) {
			case 'addTraining':
				return 	<form>
							<input type='text' name='newTraining' onChange={this.onChange} value={this.state.newTraining} />
							<button onClick={this.addTraining}>Add Training</button>
						</form>
			default:
				return <div className=''>
							<table className=''>
								<thead>
									<tr>
										<th>Training</th>
										<th>Date Created</th>
									</tr>
								</thead>
								<tbody>
									{this.state.trainings.map(training =>
										<tr key={training._id}>
											<td>{training.name}</td>
											<td>{training.date}</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
		}
	};
	
	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	
	addTrainingForm = () => {
		this.props.changeSubDisplayState('trainingsDisplay', 'addTraining');
	};
	
	addTraining = (e) => {
		e.preventDefault();
		const newTraining = {
			name: this.state.newTraining,
			__creator: this.props.user._id,
			__organization: this.props.organization._id
		};
		API.trainings.addTraining(newTraining).then(results => {
			const training = results.data;
			this.getTrainings();
			
		}).catch(err => {
			console.log(err);
		});
// 		alert('Training added: ' + this.state.newTraining)
	};
	
	getTrainings = () => {
		const query = {
			__organization: this.props.organization._id
		};
		console.log(query);
		API.trainings.getTrainings(query).then(results => {
			console.log(results.data.trainings);
			this.setState({ trainings: results.data.trainings });
			this.props.changeSubDisplayState('trainingsDisplay', 'default');
		}).catch(err => {
			console.log(err);
		});
	};
	
	render() {
		return (
			<div>
				<h3>Trainings Display</h3>
				<div onClick={() => { this.props.changeSubDisplayState('trainingsDisplay', 'addTraining') }}>Add New Training</div>
				<div onClick={() => { this.props.changeSubDisplayState('trainingsDisplay', 'default') }}>Show Trainings</div>
				{ this.switchTrainingDisplay() }
			</div>
		);
	}
}

export default TrainingsDisplay;