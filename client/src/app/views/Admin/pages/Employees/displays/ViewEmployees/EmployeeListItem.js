import React from "react";
import { Link } from 'react-router-dom';

import "./ViewEmployees.css";

import AvatarPlaceholder from "./AvatarPlaceholder.png";

class EmployeeListItem extends React.Component {
	
	render() {
		
		const { employee, organization, changeRole, deactivateEmployee, reactivateEmployee } = this.props;
		
		const thumbnailStyle = {
			backgroundImage: `url(${employee.imageURL})`,
			height: '65px',
			width: '65px',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			borderRadius: '50%'
		};
		
		return ( <div>
			{ employee
			
			?
				<Link key={employee._id} to={`/${organization.name.replace(/\s/g, '')}/employees?id=${employee._id}`}>
					<li id="hover-employee" className="collection-item avatar row valign-wrapper employeeCollectionItem">
						<div className='avatar-wrapper flex-center'>
							<div className='profile-img-thumbnail' style={thumbnailStyle}></div>
							{/*<img id='avatar-img' src={AvatarPlaceholder} alt={employee.username} className="circle" />*/}
						</div>
						<div className=''>
							<span className="title">
								{employee.fname
							        ? employee.fname
							        : <span className='defaultGray'>N/A</span>}
							    &nbsp;
							    {employee.lname
							        ? employee.lname
							        : null}
							</span>
							<p>
							  {employee.username}
							</p>
						</div>
						
						<div className=''>
							{employee.title
							    ? employee.title
							    : <span className='defaultGray'>Position not on file</span>
							}
						</div>
						
						<div className='trainingStatus-wrapper'>
							<span className='training-status'>{employee.overdueTrainings.length} Overdue</span>
							<p>
								<span>{employee.upcomingTrainings.length}</span> Upcoming
								<br />
								<span>{employee.completedTrainings.length}</span> Complete
							</p>
						</div>
						
						<div id="role-button" className=''>
							<p className={employee.role > 1 ? 'role-btn flex-center role-admin' : 'role-btn flex-center role-user'} onClick={e => changeRole(e, employee)}>{employee.role === 3 ? 'Owner' : 'Admin' }</p>
						</div>
						
						<div className=''>
						{
							employee.employeeActive
								? <span class="waves-effect waves-teal btn-flat flex-center" onClick={e => deactivateEmployee(e, employee)}>Deactivate</span>
								: <span class="waves-effect waves-teal btn-flat flex-center" onClick={e => reactivateEmployee(e, employee)}>Reactivate</span>
						}
						</div>
					</li>
				</Link>
			:
				<li className='collection-item avatar row valign-wrapper employeeCollectionItem'>
					<div id='noTrainings'>No results to show!</div>
				</li>
			}
			</div>
			
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

export default EmployeeListItem;