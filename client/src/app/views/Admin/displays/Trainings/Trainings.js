import React from "react";
import "./Trainings.css";

class TrainingsDisplay extends React.Component {
	
/*
	constructor(props) {
		super(props);
		this.state = {
			display: 'default',
			trainings: []
		};
	}
*/
	
	state = {
		display: 'default',
		trainings: []
	};
	
	switchTrainingDisplay = () => {
		switch(this.props.trainingsDisplay) {
			case 'addTraining':
				return 	<form>
							<input type='text' name='newTraining' onChange={this.onChange} value={this.state.newTraining} />
							<button onClick={this.addTraining}>Add Training</button>
						</form>
			default:
				return <div>Default Training Display</div>
		}
	};
	
	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	
	addTrainingForm = () => {
		this.props.changeSubDisplayState('trainingsDisplay', 'addTraining');
// 		this.setState({ display: 'addTraining' });
	};
	
	addTraining = (e) => {
		e.preventDefault();
		alert('Training added: ' + this.state.newTraining)
	};
	
	render() {
		return (
			<div>
				<h3>Trainings Display</h3>
				<div onClick={this.addTrainingForm}>Add New Training</div>
				{this.switchTrainingDisplay()}
			</div>
		);
	}
}

export default TrainingsDisplay;