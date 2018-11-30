import React from "react";
import { Link } from 'react-router-dom';
import "./ViewTraining.css";
import API from '../../../../../../../utils/API';
import Upload from "../../../../../components/Upload/Upload.js"

class ViewTraining extends React.Component {
	
	state = {
		message: '',
		training: { documents: [] },
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
				console.log('Training: ', training);
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
				{/*Training Card*/}
				<div className = "container">
				 <div id ="trainingsCard" className = "card">
				   <div className = "row">
				     <div className = "col s12">
					     <span class = "card-title"> 
						   <h4><strong>{training.name}</strong></h4>
						   <h6><strong>Recurring Training: {training.recurring ? 'Yes' : 'No'}</strong></h6>
						  {
							  this.state.message !== '' &&
							  <div>{this.state.message}</div>
						  }
					     </span>
				     </div>
				   </div>
					  
					{/*Training Name */}
					<div id = "trainingInfo" className = "card">
					<div className = "row">
					  <div className = " col s6">
						<div>Name: {training.name}<i id="editIcon" className = "material-icons left">timer</i></div>
					  </div>
					  {/*Training Hours*/}
					  <div className = " col s6">
					     <h6>Hours: {training.hours}<i id="editIcon" className = "material-icons left">timer</i></h6>
					  </div>	
					</div>
					{/*Training Code */}
					<div className = "row">
					  <div className = "col s6">
					  {			
					       (training.trainingCode && training.trainingCode !== '') &&
						    <div>Training Code: {training.trainingCode}<i id="editIcon" className = "material-icons left">timer</i></div>
					     }
					  </div>
					{/*Training Frequency*/}
					  <div className = "col s6">
					  
					  {
					    // training.recurring &&
						<div>Training is required every {training.frequencyNumber} {training.frequencyPeriod}{training.frequencyNumber > 1 && 's'}.<i id="editIcon" className = "material-icons left">timer</i></div>
				      }
					  </div>
					</div>
					</div>
					<div className = "row">
					 <div className = "col s6">
					  <div className = "deleteEmployee">
						  <button className = "waves-effect waves-light btn">Delete Training</button>
				  	</div>
					 </div>
					 <div className = "col s6">
							<Upload training={training} />
					 </div>
					 
					 	{ training.documents.map(doc =>
						 	<div className='doc-container'>
								<a target='_blank' href={doc}>{doc}</a>
							</div>
						)}
					   
					</div>
					
				  </div>
				 </div>
				
				
				
				
				
				<div>Documents: N/A</div>
			</div>
		);
	}
}

export default ViewTraining;