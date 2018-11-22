import React from "react";
import { Link } from 'react-router-dom';
import "./ViewEmployees.css";
import API from '../../../../../../../utils/API';
import AvatarPlaceholder from "./AvatarPlaceholder.png";

class ViewEmployees extends React.Component {
	
	state = {
		message: '',
		employees: []
	};
	
	componentDidMount() {
		this.getEmployees();
	}

	getEmployees = () => {
		const query = {
			__organization: this.props.organization._id
		};
		API.auth.getUsers(query).then(res => {
			if(res.data.success) {
				this.setState({ employees: res.data.users });
			} else {
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	render() {
		return (
			<div>
			
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				
				<div className="row">
					<div className="col s12 m12">
						<div className="card-panel teal z-depth-5">
							<div className="">
								<ul className="collection z-depth-3">

								{this.state.employees.map(employee =>
								
									<Link key={employee._id} to={`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${employee._id}`}>
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
													<a className='btn-floating btn-small right waves-effect waves-light red'>
														<i id='add-button-icon' className='large material-icons'>remove_circle_outline</i>
													</a>
												</div>
											</div>
										</li>
									</Link>
								)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ViewEmployees;