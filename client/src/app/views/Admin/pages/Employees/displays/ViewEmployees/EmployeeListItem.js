import React from "react";
import { Link } from 'react-router-dom';
import "./ViewEmployees.css";

import AvatarPlaceholder from "./AvatarPlaceholder.png";

class EmployeeListItem extends React.Component {
	
	render() {
		
		const { employee, organization } = this.props;
		
		return (			
			<Link key={employee._id} to={`/${organization.name.replace(/\s/g, '')}/employees?id=${employee._id}`}>
				<li className="collection-item avatar">
				
					<div className='row valign-wrapper'>
						<div className='col s2'>
							<img src={AvatarPlaceholder} alt="{employee.username}" className="circle" />
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
							<p className=''>Access Level</p>
						</div>
						
						<div className='col s3'>
						<span class="waves-effect waves-teal btn-flat right">Remove</span>
						</div>
					</div>
				</li>
			</Link>
		);
	}
}

export default EmployeeListItem;