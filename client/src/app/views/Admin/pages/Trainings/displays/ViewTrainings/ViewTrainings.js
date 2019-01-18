// React Imports
import React from "react";
import { Link } from 'react-router-dom';

// CSS & Local Imports
import TrainingsSubHeader from "../../TrainingsSubHeader";
import TrainingListItem from "../ViewTrainings/TrainingListItem";
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
		const { trainings } = this.state;
		return (
			<div>
				<TrainingsSubHeader search={true} addTraining={true} organization={this.props.organization} />
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				<div className="row viewEmployees-wrapper">
					<div className="col s12 m12 employee-padding">
							<ul className="collection z-depth-3">
				{trainings.map(training =>
					// <div key={training._id}><Link to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings?id=${training._id}`}>{training.name}</Link></div>
					<TrainingListItem 
						training={training}
						organization={this.props.organization}
					/>
				)}
				{ trainings.length < 1 &&
					<TrainingListItem training={false} />
				}
				</ul>
				</div>
			</div>
			</div>
		);
	}
}

export default ViewTrainings;