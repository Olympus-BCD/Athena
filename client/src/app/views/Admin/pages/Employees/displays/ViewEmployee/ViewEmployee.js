import React from "react";
import { Link } from 'react-router-dom';
import "./ViewEmployee.css";
import API from '../../../../../../../utils/API';
import EmployeesSubHeader from '../../EmployeesSubHeader';
import EmployeeImage from "./me.jpg"
import moment from 'moment';

class ViewEmployee extends React.Component {
	
	state = {
		message: '',
		employee: { trainings: [], trainingInstances: [] },
		editEmployee: {},
		editName: false,
		editUsername: false,
		editEmployeeID: false,
		editTitle: false,
		editRole: false
	};
	
	componentDidMount() {
		this.getEmployee();
	}
	
	onChange = e => {
		const { name, value } = e.target;
		const state = this.state;
		state.editEmployee[name] = value;
		this.setState(state);
	};
	
	onSubmit = e => {
		e.preventDefault();
// 		this.setState({ editName: false, employee: Object.assign({}, this.state.editEmployee ) });
		API.auth.update(this.state.editEmployee).then(response => {
			if(response.data.success) {
				const user = response.data.user;
				this.setState({
					employee: user, editEmployee: Object.assign({}, user),
					editName: false,
					editUsername: false,
					editEmployeeID: false,
					editTitle: false,
					editRole: false
				});
			} else {
				this.setState({ message: response.data.msg });
			}
		}).catch(err => {
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	cancel = () => {
		const { employee } = this.state;
		this.setState({
			editEmployee: Object.assign({}, employee),
			editName: false,
			editUsername: false,
			editEmployeeID: false,
			editTitle: false,
			editRole: false
			
		});
	};
	
	getEmployee = () => {
		const query = {
			id: this.props.id
		};
		API.auth.findById(query).then(results => {
			if(results.data.success) {
				const employee = results.data.user
				console.log('Employee: ', employee);
				this.setState({ employee: employee, editEmployee: Object.assign({}, employee) });
			} else {
				this.setState({ message: results.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/employees`);
// 			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	employeeRole = () => {
		switch(this.state.employee.role) {
			case 3:
				return 'Owner';
			case 2:
				return 'Admin';
			case 1:
				return 'User';
			default:
				return 'N/A';
		}
	};
	
	holla = e => {
		this.setState({ test: e.target.innerHTML });
	};
	
	onBlur = e => {
		alert(this.state.test);
	}


	render() {
		const { message, employee, editEmployee, user } = this.state;
		return (
			<div>
				<EmployeesSubHeader organization={this.props.organization} search={false} addEmployee={true} />
				{/* <h3>{employee.fname}</h3> */}
				{
					message !== '' &&
					<div>{message}</div>
				}
				<br/>

			{/* Employee Card */}
			<div className = "container employee-card">
			  <div class="card  ">
				<div className = "row">
				  <div className = "col s3 card-image waves-effect waves-block waves-light">
    		          <img className = "activator" src ={ EmployeeImage } alt = "employeePic"/>
    		     </div>
				  <div id = "" className="col s7">
				     <h5 id = "employeeView"><strong>{ employee.fname } { employee.lname }</strong></h5>
					 <h5 id = "titleView"><strong>{ employee.title }</strong></h5>
					 <h5 id = "roleView"><strong>{ this.employeeRole() }</strong></h5>
					 <span id = "dots-container" className = "card-title activator grey-text text-darken-4">
				      <i id = "dots" className = "material-icons">event_note</i>  View Trainings</span>
				  </div>
			  </div>
			   
			   {/* Card content setup */}
				<div className = "row">
				  <div className = "col s12">
    		        
				{/* Employee Name */}
				<div id = "cardInfo" className = "card">
				  <div id = "infoContainer" className = "container">
			      	<div className = "row">
				  		<div className = "col s4">
				   	{
					 this.state.editName
					 ?	<form onSubmit={this.onSubmit}>
						  <div id = "fname" className = "input-field col s5">
							<input type='text' name='fname' value={editEmployee.fname} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
						  </div>
						  <div id="lname" className="input-field col s5">
							<input type='text' name='lname' value={editEmployee.lname} onChange={this.onChange} />
						  </div>
						</form>
					:	<div>
							<h6>{(employee.fname && employee.lname) ? `${employee.fname} ${employee.lname}` : 'unknown'}
							<span onClick={() => this.setState({ editName: true })}><i id="editIcon" className = "material-icons left">edit</i></span>
							</h6>
						</div>
					}
				</div>

				{/*Employee Position*/}
				<div className = "col s4">
				{
					this.state.editTitle
					?  <form onSubmit={this.onSubmit}>
							<div id = "position" className = "input-field col s5">
							<input type='text' name='title' value={editEmployee.title} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
							</div>
						</form>
					:   <div>
							<h6>Position: <span>{employee.title}</span>
							{/*<h6>Position: <span value='hey' contenteditable="true" onBlur={this.onBlur} onInput={this.holla}>{employee.title}</span>*/}
							<span onClick={() => this.setState({ editTitle: true })}><i id="editIcon" className = "material-icons left">edit</i></span>
							</h6>
						</div>	
				}
				</div>

				{/* Username */}
				<div className = "col s4">
				{
					this.state.editUsername
					?	<form onSubmit={this.onSubmit}>
					    <div id = "userName" className = "input-field col s5">
							<input type='text' name='username' value={editEmployee.username} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
							</div>
						</form>
					:	<div>
							<h6>Username: {employee.username}
							<span onClick={() => this.setState({ editUsername: true })}><i id="editIcon" className = "material-icons left">edit</i></span>
						
							<i id="statusIcon" className = "material-icons right">lock</i>
							</h6>
						
						</div>
				}
				
				</div>
			</div>

				{/* Employee ID */}
				<div className = "row">
				  <div className = "col s4">
				 {
					this.state.editEmployeeID
					?	<form onSubmit={this.onSubmit}>
						  <div id = "id" className = "input-field col s5">
							<input type='text' name='employeeID' value={editEmployee.employeeID} onChange={this.onChange} />
							<span onClick={this.cancel}> Close this shit </span>
							<button type='submit'>Save</button>
						  </div>
						</form>
					:	<div>
							<h6>Employee ID: {employee.employeeID}
							<span onClick={() => this.setState({ editEmployeeID: true })}><i id="editIcon" className = "material-icons left">edit</i></span>
							</h6>
						</div>	
				  }
				  </div>

				  {/*Department*/}
				  <div className = "col s4">
				    <span>Department: {employee.department}<i id="Icon" className = "material-icons left">group_work</i></span>
				  </div>


				  {/* Permissions */}
				  <div className = "col s4">
				    <h6>Permissions: {this.employeeRole()}<i id="Icon" className = "material-icons left">supervisor_account</i></h6>
				  </div>
				</div>

				{/* Employee Hire Date */}
				<div className = "row">
				<div className = "col s4">
				    <span>Hire Date: {moment(employee.hireDate, 'X').format('MMM DD, YYYY')}<i id="Icon" className = "material-icons left">calendar_today</i></span>
				  </div>

				{/*Employee Status */}
				<div className = "col s4">
				  <span>Employee Status: {employee.employeeActive ? 'Active' : 'Inactive'}<i id="statusIcon" className = "material-icons left">verified_user</i> </span>
				</div>

				{/*Account Status*/}
				<div className = "col s4">
				  <span>Account Status: {employee.active ? 'Active' : 'Inactive'}<i id="statusIcon" className = "material-icons left">verified_user</i></span>
				</div>
			</div>
			</div>
			</div>
			<div className = "deleteEmployee">
				<button className = "waves-effect waves-light btn">Delete Employee</button>
			</div>
			</div>
			</div>

			{/* Employee Trainings  */}
    		<div className ="card-reveal">
			  <div className = "row">
			  <div className = "col s12">
      		   <span className ="card-title grey-text text-darken-4"><h4>Trainings</h4><i id='closeIcon' className = "material-icons right">close</i></span>
			  </div>
			 
			{/* Add Training Button */}
			<div className = "col s3">
				<h6 className = "hours"><strong>Current Hours: {employee.currentHours}</strong></h6>
			</div>
			{/* <div className = "col s2">
			   <h6 className = "hours"><strong>Hours Still Needed: 4</strong></h6>
			</div> */}
			<div className = "col s3">
				<h6 className="hours"><strong>Total Hours Required: {employee.totalHours}</strong><i className = "material-icons left">edit</i></h6>
			</div>
			<div className = "col s3">
			  <h6 className = "hours"><strong>Hours Due: {moment(employee.hoursResetDate, 'X').format('MMM DD, YYYY')}</strong></h6>
			</div>
          	<div className="col s3">
              <Link to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings/add`}>
                <a href="!#" className="waves-effect waves-light btn float-right">
                  <i className="material-icons left">event</i>Add Training
                </a>
              </Link>
		    </div>
		      </div>

				
		   {/*Collection of Employee Trainings - HardCoded*/}
		   <ul className = "collection">
		   <li className="collection-item avatar row valign-wrapper employeeCollectionItem">
					<div className='avatar-wrapper flex-center'>
						<i className = "material-icons">event_note</i>
					</div>
				<div className = "titleTraining">
		  		   <span className = "trainingTitle">
				    Training Name
				   </span>
				</div>

				<div className = "codeTraining">Training Code</div>

				<div className = "hoursTraining">
				  <p className = "">Training Hours</p>
				</div>

				<div className = "trainingFrequency">
				  <p>Training Frequency</p>
				</div>

				<div className = "frequencyPeriod">
				  <p>Frequency Period</p>
				</div>
			  </li>
				{
					employee.trainingInstances.map(training => 
						<li key={training._id} className='collection-item avatar row valign-wrapper employeeCollectionItem'>
							<div className='avatar-wrapper flex-center'>
								<i className='material-icons'>event_note</i>
							</div>
							<div className='titleTraining'>
								<span className='trainingTitle'>{training.name}</span>
							</div>
							<div className='codeTraining'>
								<span>{training.trainingCode}</span>
							</div>
							<div className='hoursTraining'>
								<p className=''>{training.hours}</p>
							</div>
							<div className='trainingFrequency'>
								<p>Required every {training.frequencyNumber} {training.frequencyPeriod}</p>
							</div>
							<div className='frequencyPeriod'>
								{
									training.completed
										?	<p>Completed!</p>
										:	<button>Complete</button>
								}
							</div>
						</li>
					)
				}
			  
			  <li className="collection-item avatar row valign-wrapper employeeCollectionItem">
					<div className='avatar-wrapper flex-center'>
						<i className = "material-icons">event_note</i>
					</div>
				<div className = "titleTraining">
		  		   <span className = "trainingTitle">
				    CPR
				   </span>
				</div>
				<div className = "codeTraining">
					<span>
						12345
					</span>
				</div>
				<div className = "hoursTraining">
				  <p className = "">8</p>
				</div>

				<div className = "trainingFrequency">
				  <p>1</p>
				</div>

				<div className = "frequencyPeriod">
					
				</div>
			  </li>
			  
			  
			  
		  </ul>
 		</div>
    		</div>

			{/* Cody's Code */}
				{/* {
					this.state.editName
					?	<form onSubmit={this.onSubmit}>
							<input type='text' name='fname' value={editEmployee.fname} onChange={this.onChange} />
							<input type='text' name='lname' value={editEmployee.lname} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
						</form>
					:	<div>
							<span>Name: {(employee.fname && employee.lname) ? `${employee.fname} ${employee.lname}` : 'unknown'}</span>&nbsp;
							<span onClick={() => this.setState({ editName: true })}>( EditIcon )</span>
						</div>
				}
				{
					this.state.editUsername
					?	<form onSubmit={this.onSubmit}>
							<input type='text' name='username' value={editEmployee.username} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
						</form>
					:	<div>
							<span>Username: {employee.username}</span>
							<span onClick={() => this.setState({ editUsername: true })}>( EditIcon )</span>
						</div>
				}
				{
					this.state.editEmployeeID
					?	<form onSubmit={this.onSubmit}>
							<input type='text' name='employeeID' value={editEmployee.employeeID} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
						</form>
					:	<div>
							<span>Employee ID: {employee.employeeID}</span>
							<span onClick={() => this.setState({ editEmployeeID: true })}>( EditIcon )</span>
						</div>	
				}
				{
					this.state.editTitle
					?	<form onSubmit={this.onSubmit}>
							<input type='text' name='title' value={editEmployee.title} onChange={this.onChange} />
							<span onClick={this.cancel}> X </span>
							<button type='submit'>Save</button>
						</form>
					:	<div>
							<span>Title: {employee.title}</span>
							<span onClick={() => this.setState({ editTitle: true })}>( EditIcon )</span>
						</div>	
				}
				<div>Role: {this.employeeRole()}</div> */}
				
				{/* {employee.trainings.length > 0
					?
						<ul>Trainings:
							{employee.trainings.map((training, i) => 
								<li>
									<div>{training.name}</div>
								</li>
							)}
						</ul>
					:
						<div>No Trainings Assigned :(</div>
				} */}
			 </div>
		  </div>
		);
	}
}

export default ViewEmployee;