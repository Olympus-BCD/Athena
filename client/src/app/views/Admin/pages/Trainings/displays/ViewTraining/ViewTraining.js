import React from "react";
import { Link } from 'react-router-dom';
import "./ViewTraining.css";
import API from '../../../../../../../utils/API';

class ViewTraining extends React.Component {
	
	state = {
		message: '',
		training: {},
		editTraining: {}
	};
	
	componentDidMount() {
		this.getTraining();
	}
	
	getTraining = () => {
		const query = {
			id: this.props.id
		};
		API.trainings.findById(query).then(results => {
			if(results.data.success) {
				const { training } = results.data;
// 				console.log('Training: ', training);
				this.setState({ training: training, editTraining: Object.assign({}, training) });
			} else {
				this.setState({ message: results.data.msg });
			}
		}).catch(err => {
			console.log(err);
// 			this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/trainings`);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};

	render() {
		const { training } = this.state;
		return (
			<div>
				<Link to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings`}>X</Link>
				<h3>{training.name}</h3>
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				<div>Name: {training.name}</div>
				{
					(training.trainingCode && training.trainingCode !== '') &&
						<div>Training Code: {training.trainingCode}</div>
				}
				<div>Hours: {training.hours}</div>
				<div>Recurring: {training.recurring ? 'Yes' : 'No'}</div>
				{
					training.recurring &&
						<div>Training is required every {training.frequencyNumber} {training.frequencyPeriod}{training.frequencyNumber > 1 && 's'}.</div>
				}
				<div>Documents: N/A</div>
			</div>
		);
	}
}

export default ViewTraining;