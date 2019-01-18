import React from "react";
import { Link } from 'react-router-dom';

import "./ViewTrainings.css";

import AvatarPlaceholder from "./AvatarPlaceholder.png";
import trainings from "../../../../../../../utils/API/trainings";

class TrainingListItem extends React.Component {
	
	render() {
		
		const { training, organization } = this.props;
		
		return (
			<div>
				{ training
					?
						<Link key={training._id} to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings?id=${training._id}`}>
							<li id="hover-training" className="collection-item avatar row valign-wrapper employeeCollectionItem">
								<div className='avatar-wrapper flex-center'>
									<img id='avatar-img' src={AvatarPlaceholder} alt="{training.name}" className="circle" />
								</div>
								<div className=''>
									<span className="title">
										{training.name
									        ? training.name
									        : <span className='defaultGray'>N/A</span>}						   			
									</span>
									<p>
									{training.trainingCode
									    ? training.trainingCode
									    : <span className='defaultGray'>Training not on file</span>
									}
									</p>
								</div>
								
								<div className=''>
									Category
								</div>
								
								<div className='trainingStatus-wrapper'>
									<span className='training-status'>{training.hours}</span>
								</div>
								
								<div className=''>
									<p className="">
									{training.frequencyNumber
										? training.frequencyNumber
									: <span className="defaultGray">N/A</span>}
									</p>
								</div>
								
								<div className=''>
								<p className="">
										{training.frequencyPeriod
										? training.frequencyPeriod
									: <span className="defaultGray">N/A</span>}
									</p>
								</div>
							</li>
						</Link>
					:
						<li className='collection-item avatar row valign-wrapper employeeCollectionItem'>
							<div id='noTrainings'>No trainings have been created yet.  Click the button above to start adding trainings!</div>
						</li>
					}
			</div>
		);
	}
}

export default TrainingListItem;