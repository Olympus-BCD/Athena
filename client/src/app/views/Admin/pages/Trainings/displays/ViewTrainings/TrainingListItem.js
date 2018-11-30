import React from "react";
import { Link } from 'react-router-dom';

import "./ViewTrainings.css";

import AvatarPlaceholder from "./AvatarPlaceholder.png";
import trainings from "../../../../../../../utils/API/trainings";

class TrainingListItem extends React.Component {
	
	render() {
		
		const { training, organization } = this.props;
		
		return (
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
		);
		
/*
		return (			
			<Link key={employee._id} to={`/${organization.name.replace(/\s/g, '')}/employees?id=${employee._id}`}>
				<li className="collection-item avatar">
				
					<div className='row valign-wrapper'>
						<img src={AvatarPlaceholder} alt={employee.username} className="circle" />
						<div className='col s2'>
							<span className="title">
								{employee.fname
							        ? employee.fname.toUpperCase()
							        : <span className='defaultGray'>N/A</span>}
							    &nbsp;
							    {employee.lname
							        ? employee.lname.toUpperCase()
							        : null}
							</span>
							<p>
							  {employee.title
							    ? employee.title.toUpperCase()
							    : <span className='defaultGray'>N/A</span>}
							  <br />
							  {employee.username}
							</p>
						</div>
						
						<div className='col s2'>
							<span>Employement Category</span>
						</div>
						
						<div className='col s3 center'>
							<span className='training-status'>0 Overdue</span>
							<p>
								<span>3</span> Upcoming
								<br />
								<span>12</span> Complete
							</p>
						</div>
						
						<div className='col s2 center'>
							<p className='admin-btn'>Admin</p>
						</div>
						
						<div className='col s3'>
						<span class="waves-effect waves-teal btn-flat right">Remove</span>
						</div>
					</div>
				</li>
			</Link>
		);
*/
	}
}

export default TrainingListItem;