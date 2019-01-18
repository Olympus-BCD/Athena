import React from "react";
import { Link } from 'react-router-dom';
import "./AddEmployee.css";

//	Dependencies
import crypto from 'crypto';
import moment from 'moment';
import API from '../../../../../../../utils/API';

import EmployeesSubHeader from '../../EmployeesSubHeader';
import MessageModal from '../../../../../components/MessageModal';

// Materialize Imports
import { Row, Input, Autocomplete, Collection, CollectionItem, Badge, Button, Pagination, Card } from "react-materialize";

class AddEmployee extends React.Component {
	
	state = {
		message: '',
		employee: {
			fname: '',
			lname: '',
			employeeID: '',
			title: '',
			department: '',
			hireDate: moment().format('YYYY-MM-DD'),
/*
			username: this.props.organization.usernamePrefix
				? this.props.organization.usernamePrefix + '_' + crypto.randomBytes(2).toString('hex')
				: crypto.randomBytes(3).toString('hex'),
*/
			username: '',
			password: this.props.organization.passwordDefault || crypto.randomBytes(4).toString('hex'),
			trackHours: false,
			totalHours: 0,
			trackingDate: '',
// 			trackingHoursDay: moment().format('DD'),
// 			trackingHoursMonth: moment().format('MMMM'),
			trackingHoursDay: false,
			trackingHoursMonth: false,
			trackingFrequencyNumber: 1,
			trackingFrequencyPeriod: 'year',
			trainings: []
		},
		trainings: [],
		pagination: {
			currentPage: 1,
			perPage: 10,
			count: 0,
			pages: 1
		},
		employeePagination: {
			currentPage: 1,
			perPage: 10,
			count: 0,
			pages: 1,
			IDs: [],
			extraItems: 0
		},
		newTrainings: [],
		step: 1,
		isAdmin: false,
		active: true,
		trackHours: false
	};
	
	componentDidMount() {
		this.paginate();
	}
	
	paginate = () => {
		const { pagination } = this.state;
		const { currentPage, perPage } = pagination;
		console.log('Pagination 2:', pagination);
		const offset = perPage * (currentPage - 1);
		
		API.trainings.pagination(this.props.organization, perPage, offset).then(response => {
			if(response.data.success) {
				pagination.count = response.data.count;
				pagination.pages = Math.ceil(response.data.count / perPage);
				console.log('Pagination 3:', this.state.pagination);
				this.setState({ pagination: pagination, trainings: response.data.trainings })
			} else {
				this.setState({ message: response.data.message });
			}
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh oh! Something went wrong!' });
		});
	};
	
	changePagination = page => {
		const { pagination } = this.state;
		pagination.currentPage = page;
// 		console.log('Pagination 1:', pagination);
		this.setState({ pagination: pagination });
		this.paginate();
	};
	
	changeEmployeePagination = page => {
		const { employeePagination } = this.state;
		console.log(employeePagination);
		employeePagination.currentPage = page;
		console.log(employeePagination);
		this.setState({ employeePagination: employeePagination });
// 		this.paginate();
	};
	
	renderOrganizationCollection = (trainings, heading) => {
		let pagination = <Pagination items={this.state.pagination.pages} activePage={this.state.pagination.currentPage} maxButtons={5} onSelect={this.changePagination} />;
// 		if(this.state.pagination.pages < 2) pagination = null;
		if(trainings.length < this.state.pagination.perPage) {
			let collectionItems = [];
			for(let i = trainings.length; i < this.state.pagination.perPage; i++) {
				collectionItems.push(i);
			}
			return (
				<Collection className='col s6'>
					<h5>{heading}</h5>
					{trainings.map(training => 
						<CollectionItem
							href='#!'
							key={training._id}
							onClick={e => { this.addTraining(e, training) }}
						>
							{training.name} <Badge>Add This Training</Badge>
						</CollectionItem>
					)}
					{collectionItems.map((collectionItem, i) => 
						<CollectionItem key={i} style={{listStyle: 'none'}}>&nbsp;</CollectionItem>
					)}
					{pagination}
				</Collection>
			);
		} else {
			return (
				<Collection className='col s6'>
					<h5>{heading}</h5>
					{trainings.map(training => 
						<CollectionItem
							href='#!'
							key={training._id}
							onClick={e => { this.addTraining(e, training) }}
						>
							{training.name} <Badge>Add This Training</Badge>
						</CollectionItem>
					)}
					{pagination}
				</Collection>
			);
		}
	};
	
	renderEmployeeCollection = () => {
		const trainings = this.state.employee.trainings;
		const heading = `New Employee's Trainings`;
		const pagination = this.state.employeePagination;
		
		let length = [];
// 		if(pagination.count > 5) length.push({ showPagination: true });
		length.push('wth is this???');
		
		const offset = pagination.perPage * (pagination.currentPage - 1);
		const limit = parseInt(offset) + parseInt(pagination.perPage);
		const page = trainings.slice(offset, limit);
		
		console.log('Offset/Limit:', offset, limit);
		console.log('Trainings Arr Before:', trainings);
		console.log('Page Arr:', page);
		console.log('Trainings Arr:', trainings);
		
		let paginationComp = <Pagination items={this.state.pagination.pages} activePage={this.state.pagination.currentPage} maxButtons={5} onSelect={this.changePagination} />;
		
// 		if(this.state.pagination.pages < 2) pagination = null;
		if(page.length < pagination.perPage) {
			let collectionItems = [];
			for(let i = page.length; i < pagination.perPage; i++) {
				collectionItems.push(i);
			}
			return (
				<Collection className='col s6'>
					<h5>{heading}</h5>
					{page.map(training => 
						<CollectionItem
							href='#!'
							key={training._id}
						>
							{training.name}
							
							<Badge onClick={e => { this.removeTraining(e, training) }}>Remove</Badge>
							{ (!this.state[training._id] || this.state[training._id].recreated) &&
								<Badge className='dateComplete' onClick={e => { this.markComplete(e, training) }}>Mark as Complete</Badge>
							}
							{ (this.state[training._id] && this.state[training._id].completed === false) &&
								<input id={training._id} className='dateComplete' type='date' name='dateCompleted' dateFormat='YYYY-MM-DD' label='Date Completed' value={this.state[training._id].dateCompleted} onChange={this.trainingCompletedDate} />
							}
							{ (this.state[training._id] && this.state[training._id].completed) &&
								<span id={training._id} className='dateComplete' onClick={this.markIncomplete}>Completed ({this.state[training._id].dateCompleted})</span>
							}
							
						</CollectionItem>
					)}
					{collectionItems.map((collectionItem, i) => 
						<CollectionItem key={i} style={{listStyle: 'none'}}>&nbsp;</CollectionItem>
					)}
					{length.map((l, k) => 
						<Pagination className='emp' key={k} items={pagination.pages} activePage={pagination.currentPage} maxButtons={5} onSelect={this.changeEmployeePagination} />
					)}
				</Collection>
			);
		} else {
			return (
				<Collection className='col s6'>
					<h5>{heading}</h5>
					{page.map(training => 
						<CollectionItem
							href='#!'
							key={training._id}
							onClick={e => { this.removeTraining(e, training) }}
						>
							{training.name} <Badge onClick={e => { this.removeTraining(e, training) }}>Remove</Badge> <Badge onClick={e => { this.markComplete(e, training) }}>Mark as Complete</Badge>
						</CollectionItem>
					)}
					{length.map(l => 
						<Pagination className='emp' key={l} items={pagination.pages} activePage={pagination.currentPage} maxButtons={5} onSelect={this.changeEmployeePagination} />
					)}
				</Collection>
			);
		}
	};
	
	addBlankCollectionItems = length => {
		for(let i = length; i < this.state.pagination.perPage; i++) {
			return <CollectionItem>Test</CollectionItem>
		}
	};
	
	renderTrackingHoursDays = () => {
		const { trackingHoursMonth } = this.state.employee;
		let numberOfDays = 0;
		switch(trackingHoursMonth) {
			case 'February':
				numberOfDays = 28;
				break;
			default:
				let currentYear = moment().format('YYYY');
				numberOfDays = moment(`${currentYear}-${trackingHoursMonth}`, 'YYYY-MMMM').daysInMonth();
				break;
		}
		let days = [];
		for(let i = 1; i < numberOfDays + 1; i++) {
			days.push(i);
		}
		return (
			<Input name='trackingHoursDay' type='select' defaultValue={this.state.employee.trackingHoursDay} onChange={this.onChange}>
				{days.map(day => 
					<option value={day} key={day}>{day}</option>
				)}
			</Input>
		);
	};
	
/*
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
*/
	
	onChange = e => {
		const { name, value } = e.target;
		const { employee } = this.state;
		employee[name] = value;
		employee.totalHours = employee.totalHours < 0 ? 0 : employee.totalHours;
		employee.trackingFrequencyNumber = employee.trackingFrequencyNumber < 0 ? 0 : employee.trackingFrequencyNumber;
		this.setState({ employee: employee });
	};
	
	toggleCheckbox = e => {
		const { name } = e.target;
		const state = this.state;
		state[name] = !state[name];
		this.setState(state);
	};
	
	trainingInputChange = e => {
/*
		const { name, value } = e.target;
		const state = this.state;
		state[name] = value;
		this.setState(state);
*/
		const state = this.state;
		state[e.target.name] = e.target.value;
		alert(e.target.value);
		this.setState(state);
	};
	
	changeDate = (e, val) => {
		e.preventDefault();
		const { employee } = this.state;
		const value = val == '' ? employee[e.target.name] : val;
		employee[e.target.name] = moment(value).format('YYYY-MM-DD');
		this.setState({ employee: employee });
	};
	
	markComplete = (e, training) => {
		const state = this.state;
		state[training._id] = {};
		state[training._id].completed = false;
// 		state[training._id].dateCompleted = moment().format('YYYY-MM-DD');
		this.setState(state);
	};
	
	trainingCompletedDate = (e) => {
		e.preventDefault();
		const { id, value } = e.target;
		const state = this.state;
		state[id].dateCompleted = value;
		state[id].completed = true;
		this.setState(state);
	};
	
	markIncomplete = e => {
		e.preventDefault();
		const { id } = e.target;
		const state = this.state;
// 		delete state[id];

		state[id] = {};
		state[id].recreated = true;
		
		this.setState(state);
	};
	
	previousStep = e => {
		e.preventDefault();
		console.log(e);
		let { step } = this.state;
		step--;
		this.setState({ step: step});
	};
	
	nextStep = e => {
		e.preventDefault();
		let { step, employee } = this.state;
		step++;
		employee.username =  employee.username == '' ? employee.fname.replace(/\s/g, '').toLowerCase() + employee.lname.replace(/\s/g, '').toLowerCase() : employee.username;
		employee.trackingDate = employee.trackingDate === '' ? employee.hireDate : employee.trackingDate;
		employee.trackingHoursDay = employee.trackingHoursDay ? employee.trackingHoursDay : moment(employee.hireDate).format('DD');
		employee.trackingHoursMonth = employee.trackingHoursMonth ? employee.trackingHoursMonth : moment(employee.hireDate).format('MMMM');
		this.setState({ step: step, employee: employee });
	};
	
	addEmployee = (e) => {
		console.log('State upon registration:', this.state);
// 		console.log('EMP Trainings:', this.state.employee.trainings);
/*
		console.log(this.state);
		const test = moment('2018-11-22').add(1, 'year').startOf('day').format('X');
		const test2 = moment('2018-11-14').add(1, 'year').startOf('day').format('X');
		return console.log(test, test2);
*/
		e.preventDefault();
		const { employee } = this.state;
		employee.__organization = this.props.organization._id;
		const trainingInstances = employee.trainings;
		employee.trainings = this.state.newTrainings;
// 		employee.trainingInstances = this.state.newTrainings;
		employee.role = this.state.isAdmin ? 2 : 1;
		employee.trackHours = this.state.trackHours;
		employee.totalHours = employee.totalHours < 1 ? 1 : employee.totalHours;
		employee.hireDate = moment(employee.hireDate).format('X');
		employee.trackingDate = moment(employee.trackingDate).format('X');
		employee.trackingFrequencyNumber = employee.trackingFrequencyNumber < 1 ? 1 : employee.trackingFrequencyNumber;
		if(!this.state.active) {
			employee.role = 1;
			employee.active = false;
		}
		const currentYear = moment().format('YYYY');
		const trackingDateThisYear = parseInt(moment(`${currentYear}-${employee.trackingHoursMonth}-${employee.trackingHoursDay}`, 'YYYY-MMMM-DD').format('X'));
// 		const oneYearAgo = parseInt(moment().subtract(1, 'year').format('X'));
		const todayUnformated = moment().format('MM-DD-YYYY');
		const today = parseInt(moment(todayUnformated, 'MM-DD-YYYY').format('X'));
		const trackingDateHasPassed = trackingDateThisYear <= today;
		
		const trackingHoursYear = trackingDateHasPassed ? moment((moment().add(1, 'year'))).format('YYYY') : moment().format('YYYY');
		employee.hoursResetDate = moment(`${trackingHoursYear}-${moment(employee.trackingHoursMonth, 'MMMM').format('MM')}-${employee.trackingHoursDay}`).format('X');	
		
/*
		const day = employee.trackingHoursDay;
		const month = employee.trackingHoursMonth;
		const frequency = employee.trackingFrequencyNumber;
		const period = employee.trackingFrequencyPeriod;
		
		const currentTrackingCycleStart = moment(today, 'X').subtract(frequency, period);
		const trackingDateOutsideOfCurrentCycle = 
*/

		API.auth.register(employee).then(res => {
			if(res.data.success) {
				const user = res.data.user;
				//	Use recursion to handle asynchronous creation of the training instances and newsfeed items
				let count = 0;
				let trainingsCompleted = [];
				let trainingInstancesToAdd = [];
				console.log('Total Starting Instances:', trainingInstances);
				const createTrainingInstances = () => {
					if(count < trainingInstances.length) {
						const instance = trainingInstances[count];
						const trainingID = instance._id;
						delete instance._id;
						instance.__user = user._id;
// 						instance.completed = false;
						instance.completed = (this.state[trainingID] && this.state[trainingID].completed) || false;
						instance.dueDate = (instance.completed)
							? moment(this.state[trainingID].dateCompleted).add(instance.frequencyNumber, instance.frequencyPeriod).startOf('day').format('X')
							: moment(user.hireDate, 'X').add(instance.frequencyNumber, instance.frequencyPeriod).startOf('day').format('X');
						
						const today = moment().startOf('day').format('X');
/*
						if(instance.dueDate < today) {
							const year = moment().add(1, 'year').year();
							instance.dueDate = moment(instance.dueDate, 'X').format('MM-DD');
							instance.dueDate += '-' + year;
						}
*/
						while(instance.dueDate < moment().startOf('day').format('X')) {
							instance.dueDate = moment(instance.dueDate, 'X').add(instance.frequencyNumber, instance.frequencyPeriod).format('X');
						}
						console.log('ID Exists && Completed:', (this.state[trainingID] && this.state[trainingID].completed));
						console.log('Hire Date:', user.hireDate);
						console.log('Hire Date:', moment(user.hireDate));
						console.log('Hire Date:', moment(user.hireDate, 'X').add(instance.frequencyNumber, instance.frequencyPeriod));
						console.log('Hire Date:', moment(user.hireDate, 'X').add(instance.frequencyNumber, instance.frequencyPeriod).format('X'));
						console.log('Moment 2:', moment(user.hireDate, 'X').add(instance.frequencyNumber, instance.frequencyPeriod).startOf('day').format('X'));
						console.log(`Moment 2 = moment(${user.hireDate}).add(${instance.frequencyNumber}, ${instance.frequencyPeriod[0]}).startof('day').format('X');`)
						console.log('Instance/trainingInstances[' + count + ']', instance, trainingInstances);
						if(instance.completed) {
							instance.dateCompleted = moment(this.state[trainingID].dateCompleted).startOf('day').format('X');
							console.log('Moment 1:', moment(this.state[trainingID].dateCompleted).add(instance.frequencyNumber, instance.frequencyPeriod[0]).startOf('day').format('X'));
							console.log(instance.dateCompleted);
						}
						instance.__training = trainingID;
						console.log('Training Instance to be created:', instance);
						API.trainingInstance.create(instance).then(res => {
// 							return console.log('User:', user, 'Org:', this.props.organization, 'Data from training instance creation', res.data);
							if(res.data.success) {
								const newTrainingInstance = res.data.trainingInstance;
								trainingInstancesToAdd.push(newTrainingInstance._id);
								console.log('Training instance created:', newTrainingInstance);
// 								console.log('Added to user Instances:', user);
								if(this.state[trainingID] && this.state[trainingID].completed) {
									
									API.auth.addTrainingHours({ userID: user._id, hours: res.data.trainingInstance.hours}).then(res => {
										if(res.data.success) {
											console.log('User hours updated.', res.data.user);
											
											if(instance.recurring) {
											
												const recreatedTrainingInstance = newTrainingInstance;
												recreatedTrainingInstance.dueDate = moment(newTrainingInstance.dateCompleted, 'X').add(instance.frequencyNumber, instance.frequencyPeriod).startOf('day').format('X');
												delete recreatedTrainingInstance._id;
												delete recreatedTrainingInstance.dateCompleted;
												recreatedTrainingInstance.completed = false;
												
												console.log('Re-creating recurring instance:', recreatedTrainingInstance);
												
												API.trainingInstance.create(recreatedTrainingInstance).then(res => {
													if(res.data.success) {
														console.log('Re-created training instance:', res.data.trainingInstance);
	
														trainingInstancesToAdd.push(res.data.trainingInstance._id);
														trainingsCompleted.push(newTrainingInstance._id);
														
// 														console.log('Added re-created instance to user (not saved to DB):', user);
														count++;
														createTrainingInstances();
													} else {
														console.log('Error re-creating training instance:', recreatedTrainingInstance);
														console.log(res.data.msg);
														count++;
														createTrainingInstances();
													}
												}).catch(err => {
													console.log('Error re-creating training instance:', recreatedTrainingInstance);
													console.log(err);
													count++;
													createTrainingInstances();
												});
	/*
												const trainingCompletedNewsfeedItem = {
													__user: user._id,
													__organization: this.props.organization._id,
													__trainingInstance: newTrainingInstance._id,
													trainingName: instance.name,
													userFirstName: user.fname,
													userLastName: user.lname,
													activityType: 'trainingCompleted'
												};
	*/
												
	/*
												API.newsfeed.create(trainingCompletedNewsfeedItem).then(res => {
													if(res.data.success) {
														console.log('Newsfeed Item created.', res.data.newsfeedItem);
														count++;
														createTrainingInstances();
													} else {
														console.log(res.data.msg);
														count++;
														createTrainingInstances();
													}
												}).catch(err => {
													console.log('Error creating training completed newsfeed item:', err);
													count++;
													createTrainingInstances();
												});
											
*/
											} else {
												count++;
												createTrainingInstances();
											}
										} else {
											console.log('Error updating training hours.');
// 											res.data.msg is undefined
											console.log('Ugh...', res.data);
// 											console.log(res.data.msg);
											count++;
											createTrainingInstances();
										}
									}).catch(err => {
										console.log('Error adding training hours.', err);
										count++;
										createTrainingInstances();
									});
								} else {
									count++;
									createTrainingInstances();
								}
							} else {
								console.log('Error creating training instance:', instance);
								console.log(res.data.msg);
								count++;
								createTrainingInstances();
							}
						}).catch(err => {
							console.log('Error creating training instance:', instance);
							console.log(err);
							count++;
							createTrainingInstances();
						});
					} else {
						//	In all error cases during recursion, could add an error flag to check here before continuing
						
						API.auth.addTrainingInstances(user._id, trainingInstancesToAdd).then(res => {
							if(res.data.success) {
								console.log('Added training instances to user:', trainingInstancesToAdd, res.data.user);
								const newUserNewsfeedItem = {
									__user: user._id,
									userFirstName: user.fname,
									userLastName: user.lname,
									__organization: this.props.organization,
									activityType: 'newUser'
								};
								console.log('Trianings Completed:', trainingsCompleted);
								if(trainingsCompleted.length > 0) {
									newUserNewsfeedItem.activityType = 'hybrid';
									newUserNewsfeedItem.completedTrainings = trainingsCompleted;
									newUserNewsfeedItem.numberOfCompletedTrainings = trainingsCompleted.length;
								}
		
								API.newsfeed.create(newUserNewsfeedItem).then(res => {
									if(res.data.success) {
										console.log('Newsfeed Item created.', res.data.newsfeedItem);
										console.log('All instances created. What next?');
										this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/employees?id=${user._id}`);
									} else {
										this.setState({ message: res.data.msg });
									}
									
								}).catch(err => {
									console.log('Error creating new user newsfeed item:', err);
									this.setState({ message: 'Uh Oh! Something went wrong!' });
								});
							} else {
								console.log('Error updating user with recreated training instance:', user);
								if(res.data.error) console.log(res.data.error);
								this.setState({ message: res.data.msg });
							}
						}).catch(err => {
							console.log('Error updating user with training instance:', err);
							this.setState({ message: 'Uh Oh! Something went wrong!' });
						});
					}
				};
				createTrainingInstances();
			} else {
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			console.log(err);
			if(err) this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	addTraining = (e, training) => {
		e.preventDefault();
		
		let { employee, newTrainings, employeePagination } = this.state;
		const state = this.state;
// 		const trainings = this.state.trainings.filter(t => t._id != training._id);
		if(newTrainings.indexOf(training._id) < 0) {
			newTrainings.push(training._id);
// 			state[training._id] = { completed: false };
			employee.trainings.push(training);
			employeePagination.count++;
			
			if(employeePagination.count % employeePagination.perPage == 1 && employeePagination.count > employeePagination.perPage) employeePagination.currentPage++;
			
			employeePagination.pages = Math.ceil(employeePagination.count / employeePagination.perPage);
			employeePagination.extraItems = employeePagination.count % employeePagination.perPage;
		}
// 		this.setState({ employee: employee, trainings, trainings });
		this.setState({ employee: employee, newTrainings: newTrainings, employeePagination: employeePagination });
	};
	
	removeTraining = (e, training) => {
		e.preventDefault();
		let { employee, trainings, newTrainings, employeePagination } = this.state;
// 		const IDs = employeePagination.IDs.filter(id => id != training._id);
// 		console.log('Training:', training);
// 		console.log('Pre-filter:', employeePagination);
		newTrainings = newTrainings.filter(id => id != training._id);
// 		delete this.state[training._id];
		employee.trainings = employee.trainings.filter(t => t._id != training._id);
		employeePagination.count--;
		
		if(employeePagination.count % 5 == 0 && employeePagination.currentPage > 0) employeePagination.currentPage--;
		employeePagination.currentPage = employeePagination.currentPage == 0 ? 1 : employeePagination.currentPage;
		
		if(this.state[training._id]) delete this.state[training._id];
		
		employeePagination.pages = Math.ceil(employeePagination.count / employeePagination.perPage);
		employeePagination.extraItems = employeePagination.count % employeePagination.perPage;
// 		console.log('Post-filter:', employeePagination);
// 		if(trainings.indexOf(training)  < 0) trainings.push(training);
// 		this.setState({ employee: employee, trainings: trainings });
		this.setState({ employee: employee, newTrainings: newTrainings, employeePagination: employeePagination });
	};

/*
	render() {
		return (
			<div>
				<Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees`}>X</Link>
				<h3>Add Employee</h3>
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				<form>
					<label htmlFor='fnameInput' className=''>First Name</label>
					<input type='text' name='fname' onChange={this.onChange} value={this.state.employee.fname} />
					
					<label htmlFor='lnameInput' className=''>Last Name</label>
					<input type='text' name='lname' onChange={this.onChange} value={this.state.employee.lname} />
					
					<label htmlFor='employeeIDInput' className=''>Employee ID</label>
					<input type='text' name='employeeID' onChange={this.onChange} value={this.state.employee.employeeID} />
					
					<label htmlFor='titleInput' className=''>Title</label>
					<input type='text' name='title' onChange={this.onChange} value={this.state.employee.title} />
					
					<label htmlFor='usernameInput' className=''>Username</label>
					<input type='text' name='username' onChange={this.onChange} value={this.state.employee.username} />
					
					<label htmlFor='passwordInput' className=''>Password</label>
					<input type='text' name='password' onChange={this.onChange} value={this.state.employee.password} />
					
					<div>Trainings:</div>
					{
						this.state.employee.trainings.map(training => 
							<div key={training._id}>{training.name}</div>
						)
					}
					<button onClick={this.toggleTrainings}>+ Training</button>
					{
						<Row>
						<Autocomplete
							title='Add Training'
							s={6}
							data={{
								'Training': null,
								'My Training': null,
								'Yay!': 'http://placehold.it/250x250'
							}}
						/>
						<Input s={6} type='select' label='Trainings' defaultValue='Training'>
							<option value='Training'>Training</option>
							<option value='My Training'>My Training</option>
							<option value='Yay!'>Yay!</option>
						</Input>
						</Row>
					}
					
					<button onClick={this.addEmployee}>Add Employee</button>
				</form>
			</div>
		);
	}
*/

closeMessageModal = () => {
	this.setState({ message: '' })
};

	render() {
		const { user, organization } = this.props;
		const { employee, trainings, pagination, step } = this.state;
		return (
			<div>
				<EmployeesSubHeader organization={this.props.organization} />
				{
					this.state.message !== '' &&
					// <div>{this.state.message}</div>
					<MessageModal message={this.state.message} closeMessageModal={this.closeMessageModal} />
				}
				<form className='center-align'>
					{
						step === 1 &&
					<div>
						<Card className="add-employee-card">
							<Row>
								<h4 className="white-text">Step One: Employee Info</h4>	
							</Row>
						<Card className="form-card">
							<Row>
								<Input s={6} label='First Name' defaultValue={employee.fname} onChange={this.onChange} name='fname' />
								<Input s={6} label='Last Name' defaultValue={employee.lname} onChange={this.onChange} name='lname' />
							</Row>
							<Row>
								<Input s={6} label='Employee ID' defaultValue={employee.employeeID} onChange={this.onChange} name='employeeID' />
								<Input s={6} name='hireDate' label='Hire Date' type='date' dateFormat='YYYY-MM-DD' value={employee.hireDate}  onChange={this.changeDate} />
							</Row>
							<Row>
								<Input s={6} label='Position' defaultValue={employee.title} onChange={this.onChange} name='title' />
								<Input s={6} label='Department' defaultValue={employee.department} onChange={this.onChange} name='department' />
							</Row>
						</Card>
						</Card>
					</div>
					}
					{
						step === 2 &&
					<div>
						<Card className="add-employee-card">
							<Row>
							<h4 className="white-text">Step Two: Account Info</h4>
							</Row>
						<Card className="form-card">
							<Row>
								<Input s={6} label='Account Username' defaultValue={employee.username} onChange={this.onChange} name='username' />
								<Input s={6} label='Default Password' defaultValue={employee.password} onChange={this.onChange} name='password' />
							</Row>
							<Row>
								<Input name='isAdmin' type='checkbox' value={this.state.isAdmin} checked={this.state.isAdmin ? 'checked' : null} label='Create this user with Admin privileges' onClick={this.toggleCheckbox} />
							</Row>
							<Row>
								<Input name='active' type='checkbox' value={this.state.active} checked={!this.state.active ? 'checked' : null} label='Do not create an account for this user' onClick={this.toggleCheckbox} />
							</Row>
						</Card>
						</Card>
					</div>
					}
					{
						step == 3 &&
					<div>
						<Card className="add-employee-card">
							<Row>
								<h4 className="white-text">Step Three: Training Info</h4>	
							</Row>
						<Card className="form-card">
							<Row>
								<Input name='trackHours' type='checkbox' value={this.state.trackHours} checked={this.state.trackHours ? 'checked' : null} label='Track training hours for this employee' onClick={this.toggleCheckbox} />
							</Row>
							{
								this.state.trackHours &&
							<div>
								<Row>
									<p s={12}>How many total training hours does this employee require?</p>
								</Row>
								<Row>
									<Input name='totalHours' type='number' value={employee.totalHours} onChange={this.onChange} />
									{/* <Input name='trackingDate' type='date' label='Start tracking hours on:' dateFormat='YYYY-MM-DD' value={employee.trackingDate} onChange={this.changeDate} /> */}
								</Row>
								<Row>
									<p s={12}>On what day should this {`employee's`} training hours reset?</p></Row>
								<Row>
									
									<Input name='trackingHoursMonth' type='select' defaultValue={employee.trackingHoursMonth} onChange={this.onChange}>
										<option value='January'>January</option>
										<option value='February'>February</option>
										<option value='March'>March</option>
										<option value='April'>April</option>
										<option value='May'>May</option>
										<option value='June'>June</option>
										<option value='July'>July</option>
										<option value='August'>August</option>
										<option value='September'>September</option>
										<option value='October'>October</option>
										<option value='November'>November</option>
										<option value='December'>December</option>
									</Input>
									{ this.renderTrackingHoursDays() }
								</Row>																				

							{/*<Row>How frequently should this {`employee's`} training hours reset?</Row>
							<Row>Every&nbsp;
								<Input name='trackingFrequencyNumber' type='number' value={employee.trackingFrequencyNumber} onChange={this.onChange} />
								<Input name='trackingFrequencyPeriod' type='select' defaultValue={employee.trackingFrequencyPeriod} onChange={this.onChange}>
									<option value='day'>{employee.trackingFrequencyNumber == 1 ? 'Day' : 'Days'}</option>
									<option value='month'>{employee.trackingFrequencyNumber == 1 ? 'Month' : 'Months'}</option>
									<option value='year'>{employee.trackingFrequencyNumber == 1 ? 'Year' : 'Years'}</option>
								</Input>
							</Row>*/}
							</div>
						}
							<Row><h5 className="white-text">Select any additional trainings to add to this employee</h5></Row>
								<Row>
									<span className="white-text">{this.renderOrganizationCollection(trainings, `${organization.name}'s Trainings`)}</span>
									<span className="white-text">{this.renderEmployeeCollection()}</span>
								</Row>
							</Card>
						</Card>
					</div>
					}
						<Row>
						{ (step === 2 || step === 3) &&
								<Button id="back-button" onClick={this.previousStep}>Back</Button>
						}
						{ (step === 1 || step === 2) &&
							<Button id="next-button" onClick={this.nextStep}>Next</Button>
						}
						{ (step === 3) &&
							<Button id="submit-employee" onClick={this.addEmployee}>Add Employee</Button>
						}
						</Row>
				</form>
			</div>
		);
	}
	
/*
					<Row>
						<Autocomplete
							title='Add Training'
							s={10}
							name='newTraining'
							onChange={this.trainingInputChange}
							data={{
								'Training': null,
								'My Training': null,
								'Yay!': 'http://placehold.it/250x250'
							}}
						/>
						<Button floating large className='green' waves='light' icon='add' onClick={this.addTraining} />
					</Row>
					
					
					<Row>
						<Collection className='col s6'>
						{
							employee.trainings > 0
								?	<div>
										<CollectionItem href='#!'>{this.state.trainings[0]}<Badge newIcon>1</Badge></CollectionItem>
										<CollectionItem href='#!'>My Training <Badge newIcon>4</Badge></CollectionItem>
										<CollectionItem href="#!">Yay! <Badge newIcon>2</Badge></CollectionItem>
									</div>
								:	<CollectionItem>No Trainings Selected</CollectionItem>
						}
							
						</Collection>
					
					
						<Input s={4} type='select' label='Add Training' defaultValue='Add Training' onChange={this.trainingSelected}>
							<option value='Add Training'>Select A Training</option>
							<option value='My Training'>My Training</option>
							<option value='Yay!'>Yay!</option>
							<option className='addTrainingOption' value='add'>Add New Training</option>
						</Input>
						<Button floating large className='green' waves='light' icon='add' onClick={this.addTraining} />
					</Row>
					
					<Collection className='col s6'>
							<h5>{`${organization.name}'s Trainings`}</h5>
						{
							trainings.map((training) => 
								<CollectionItem
									href='#!'
									key={training._id}
									onClick={e => { this.addTraining(e, training) }}
								>
									{training.name} <Badge>Add This Training</Badge>
								</CollectionItem>
							)
						}
							<Pagination items={pagination.pages} activePage={pagination.currentPage} maxButtons={5} onSelect={this.changePagination} />
						</Collection>
						{/ *this.addBlankCollectionItems(trainings.length)* /}
						
						<Collection className='col s6'>
						{
							employee.trainings.map(training => 
								<CollectionItem
									href='#!'
									key={training._id}
									onClick={e => { this.removeTraining(e, training) }}
								>
									{training.name} <Badge>Remove This Training</Badge>
								</CollectionItem>
							)
						}
						</Collection>
						
						<Collection className='col s6'>
							<h5>{employee.fname !='' ? `${employee.fname}'s Trainings` : `New Employee's Trainings`}</h5>
						{
							employee.trainings.map(training => 
								<CollectionItem
									href='#!'
									key={training._id}
									onClick={e => { this.removeTraining(e, training) }}
								>
									{training.name} <Badge>Remove This Training</Badge>
								</CollectionItem>
							)
						}
						</Collection>

*/
}

export default AddEmployee;