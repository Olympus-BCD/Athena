import React from "react";
import { Link } from 'react-router-dom';
import "./ViewEmployee.css";
import API from '../../../../../../../utils/API';
import EmployeesSubHeader from '../../EmployeesSubHeader';
import moment from 'moment';
import EmployeeImage from "./AvatarPlaceholder.png"
import UploadProfilePic from "../../../../../components/UploadProfilePic/UploadProfilePic"

// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental';
import { Input } from 'react-materialize';

class ViewEmployee extends React.Component {
	
	state = {
		message: '',
		employee: { trainings: [], trainingInstances: [] },
		trainings: [],
		dropdown: false,
		showModal: false,
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
				const query = {
					__organization: this.props.organization._id
				};
				API.trainings.getTrainings(query).then(results => {
					if(results.data.success) {
						this.setState({ employee: employee, editEmployee: Object.assign({}, employee), trainings: results.data.trainings, message: '' });
					} else {
						console.log('Error retrieving trainings.');
						this.setState({ message: results.data.msg });
					}
				}).catch(err => {
					console.log(err);
					this.setState({ message: 'Uh oh! Something went wrong!' });
				});
			} else {
				this.setState({ message: results.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/employees`);
// 			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	addTrainingInstance = training => {
		const { employee } = this.state;
		training.__user = employee._id;
		training.__training = training._id;
		delete training.documents;
		delete training._id;
		const hireDate = moment(employee.hireDate, 'X').format('YYYY-MM-DD');
		training.dueDate = moment(hireDate).add(training.frequencyNumber, training.frequencyPeriod).format('X');
		console.log('Hire Date:', hireDate);
		console.log('Due Date:', moment(training.dueDate, 'X').format('YYYY-MM-DD'));
		const today = moment().startOf('day').format('X');
		if(training.dueDate < today) {
			const year = moment().add(1, 'year').year();
			training.dueDate = moment(training.dueDate, 'X').format('MM-DD');
			training.dueDate += '-' + year;
		}
// 		return console.log('Creating training instance:', employee._id, [ training ]);
		API.trainingInstance.create(training).then(res => {
			if(res.data.success) {
				API.auth.addTrainingInstances(employee._id, [ res.data.trainingInstance._id ]).then(res => {
					if(res.data.success) {
						this.getEmployee();
					} else {
						console.log('Error adding training instance to user:', res.data.error);
						this.setState({ message: res.data.msg });
					}
				}).catch(err => {
					console.log('Error adding training instance to user:', err);
					this.setState({ message: 'Uh Oh! Something went wrong!' });
				});
			} else {
				console.log('Error creating training instance:', res.data.error);
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			console.log('Error creating training instance:', err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	completeTraining = training => {
		const completedTraining = Object.assign({}, training);
		completedTraining.completed = true;
// 		this.toggleModal();
		this.setState({ completedTraining: completedTraining, showModal: true });
	};
	
	toggleModal = () => {
		const state = this.state;
		state.showModal = !state.showModal;
		this.setState(state);
	};
	
	cancelModal = e => {
		e.preventDefault();
		this.setState({ completedTraining: {}, showModal: false });
	};
	
	changeCompletionDate = e => {
		const { completedTraining } = this.state;
		completedTraining.dateCompleted = moment(e.target.value, 'DD MMMM, YYYY').format('X');
		console.log(completedTraining);
	};
	
	finalizeCompletion = e => {
		e.preventDefault();
		console.log(this.state.completedTraining);
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
	
	toggleTrainingsDropdown = () => {
		const { dropdown } = this.state;
		this.setState({ dropdown: !dropdown });
	};
	
	holla = e => {
		this.setState({ test: e.target.innerHTML });
	};
	
	onBlur = e => {
		alert(this.state.test);
	}

	render() {
		const { message, employee, editEmployee, dropdown, trainings, showModal } = this.state;
		
		let trainingInstancesIDs = [];
		employee.trainingInstances.forEach(training => {
			trainingInstancesIDs.push(training.__training);
		});
		let filteredTrainings = trainings.filter(training => ( trainingInstancesIDs.indexOf(training._id) < 0 || !training.recurring ));
		
		return (
			<div>
				<EmployeesSubHeader organization={this.props.organization} search={false} addEmployee={true} />
				{
					message !== '' &&
					<div>{message}</div>
				}
				{ showModal &&
					<div className='modalBackground'>
						<div className='modalContainer'>
							<div className='modalFormContainer'>
								<h5>What day was this training completed?</h5>
								<form>
									<Input type='date' name='dateCompleted' label='Completion Date' defaultValue={moment().format('YYYY-MM-DD')} onChange={e => this.changeCompletionDate(e) } />
									<button onClick={this.cancelModal}>Cancel</button>
									<button type='submit' onClick={this.finalizeCompletion}>Complete Training</button>
								</form>
							</div>
						</div>
					</div>
				}
			{/* Employee Card */}
			<div className = "container employee-card">
			  <div id = "employeeCard" class="card  ">
				<div id='topProfile-wrapper' className = "row">
				  <div id='profileImg-wrapper' className = "col s2 card-image waves-effect waves-block waves-light">
				    <UploadProfilePic />
					{/* <img id ="profilePic" src = {EmployeeImage} alt="defaultImage"/> */}
    		  </div>
				  <div id = "profileInfo-wrapper" className="col s7">
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
							<span onClick={this.cancel}><i class="material-icons">clear</i> </span>
							<button className = "save" type='submit'>Save</button>
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
							<span onClick={this.cancel}><i class="material-icons">clear</i> </span>
							<button className = "save" type='submit'>Save</button>
							</div>
						</form>
					:   <div>
							<h6>Position: 
								<span>  { employee.title
											? <span>{employee.title}</span>
											: <span>Not on file</span>
										}
								</span>
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
							<span onClick={this.cancel}><i class="material-icons">clear</i> </span>
							<button className = "save" type='submit'>Save</button>
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
							<span onClick={this.cancel}><i class="material-icons">clear</i> </span>
							<button className = "save" type='submit'>Save</button>
						  </div>
						</form>
					:	<div>
							<h6>Employee ID: 	<span>	{ employee.employeeID
															? <span>{employee.employeeID}</span>
															: <span>Not on file</span>
														}
												</span>
							<span onClick={() => this.setState({ editEmployeeID: true })}><i id="editIcon" className = "material-icons left">edit</i></span>
							</h6>
						</div>	
				  }
				  </div>

				  {/*Department*/}
				  <div className = "col s4">
				    <span>Department:
				    	<span>	{ employee.department
					    			? <span>{employee.department}</span>
					    			: <span>Not on file</span>
				    			}
				    	</span>
				    	<i id="Icon" className = "material-icons left">group_work</i>
				    </span>
				  </div>


				  {/* Permissions */}
				  <div className = "col s4">
				    <h6>Permissions: {this.employeeRole()}<i id="Icon" className = "material-icons left">supervisor_account</i></h6>
				  </div>
				</div>

				{/* Employee Hire Date */}
				<div className = "row">
				<div className = "col s4">
				    <span>Hire Date: { employee.hireDate > 0
								    	? <span>{moment(employee.hireDate, 'X').format('MMM DD, YYYY')}</span>
								    	: <span>Not on file</span>
								     }
						<i id="Icon" className = "material-icons left">calendar_today</i>
					</span>
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
				<button id = "employeeDelete" className = "waves-effect waves-light btn">Delete Employee</button>
			</div>
			</div>
			</div>

			{/* Employee Trainings  */}
    		<div id = "revealTrainings" className ="card-reveal">
			  <div className = "row">
			  <div className = "col s12">
      		   <span className ="card-title grey-text text-darken-4"><h4 id = "trainingsHeader">Trainings</h4><i id='closeIcon' onClick={() => this.setState({ dropdown: false })} className = "material-icons right">close</i></span>
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
			  <h6 className = "hours"><strong>Hours Due: { employee.hoursResetDate > 0
				  	? <span>{moment(employee.hoursResetDate, 'X').format('MMM DD, YYYY')}</span>
				  	: <span>N/A</span>
				  	}
				  </strong>
			  </h6>
			</div>
          	<div id='add-training-container' className="col s3">
                <span id = "trainingAdd" className="waves-effect waves-light btn float-right" onClick={this.toggleTrainingsDropdown}>
                  <i className="material-icons left">event</i>Add Training
                </span>
                 { dropdown &&
				    <ul className='add-training-dropdown-wrapper'>
				    	{filteredTrainings.map(training =>
					    	<li key={training._id} className='training-dropdown-item' onClick={e => this.addTrainingInstance(training)}>{training.name} { training.trainingCode && <span>({training.trainingCode})</span>}</li>
					    )}
				    </ul>
				}
		    </div>
		    </div>

				
		   {/*Collection of Employee Trainings - HardCoded*/}
		   <ul className = "collection">
		   {/*<li className="collection-item avatar row valign-wrapper employeeCollectionItem">
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
				  <p>Completed</p>
				</div>
			  </li>*/}
				{
					employee.trainingInstances.map(training => 
						<li key={training._id} className='collection-item avatar row valign-wrapper employeeCollectionItem'>
							<div className='avatar-wrapper flex-center'>
								<i className='material-icons'>event_note</i>
							</div>
							<div className='titleTraining'>
								<span className='trainingTitle'>{training.name}</span>
								{training.trainingCode &&
									<span>
										<br />
										<span className='trainingTitle'>{training.trainingCode}</span>
									</span>
								}
							</div>
							<div className='hoursTraining'>
								<p className=''>{training.hours} hours</p>
							</div>
							<div className='trainingFrequency'>
								{ training.recurring 
									? <p>Required every {training.frequencyNumber !== 1 ? training.frequencyNumber : null} {training.frequencyPeriod}</p>
									: <p>This training is not recurring</p>
								}
							</div>
							<div className='codeTraining'>
								{ training.completed
									? <span>Completed on {moment(training.dateCompleted, 'X').format('MMM DD, YYYY')}</span>
									: <span>Due: {moment(training.dueDate, 'X').format('MMM DD, YYYY')}</span>
								}
							</div>
							<div className='frequencyPeriod'>
								{
									training.completed
										?	<p>Completed!</p>
										:	<button id='completeTraining' className='waves-effect waves-light btn' onClick={e => this.completeTraining(training)}>Complete</button>
								}
							</div>
						</li>
					)
				}
				{
					employee.trainingInstances.length === 0 &&
						<li className='collection-item avatar row valign-wrapper employeeCollectionItem'>
							<div id='noTrainings'>No trainings have been assigned to this user.  Click the button above to add trainings!</div>
						</li>
				}
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