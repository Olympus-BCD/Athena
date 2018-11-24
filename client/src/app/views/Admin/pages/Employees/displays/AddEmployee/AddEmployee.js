import React from "react";
import { Link } from 'react-router-dom';
import "./AddEmployee.css";

//	Dependencies
import crypto from 'crypto';
import API from '../../../../../../../utils/API';

// Materialize Imports
import { Row, Input, Autocomplete, Collection, CollectionItem, Badge, Button, Pagination } from "react-materialize";

class AddEmployee extends React.Component {
	
	state = {
		message: '',
		employee: {
			fname: '',
			lname: '',
			employeeID: '',
			title: '',
			username: this.props.organization.usernamePrefix
				? this.props.organization.usernamePrefix + '_' + crypto.randomBytes(2).toString('hex')
				: crypto.randomBytes(3).toString('hex'),
			password: this.props.organization.passwordDefault || crypto.randomBytes(4).toString('hex'),
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
		step: 1
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
							onClick={e => { this.removeTraining(e, training) }}
						>
							{training.name} <Badge>Remove This Training</Badge>
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
							{training.name} <Badge>Remove This Training</Badge>
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
		const state = this.state;
		state.employee[name] = value;
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
	
	toggleTrainings = e => {
		e.preventDefault();
		this.setState({ addTraining: true });
	};
	
	addEmployee = (e) => {
		e.preventDefault();
		const { employee } = this.state;
		employee.__organization = this.props.organization._id;
		employee.trainings = this.state.newTrainings;
		API.auth.register(employee).then(res => {
			if(res.data.success) {
				this.props.history.push(`/${this.props.organization.name.replace(/\s/g, '')}/employees`);
			} else {
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			if(err) this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	trainingSelected = e => {
		console.log(e.target.value);
	};
	
	addTraining = (e, training) => {
		e.preventDefault();
		let { employee, newTrainings, employeePagination } = this.state;
// 		const trainings = this.state.trainings.filter(t => t._id != training._id);
		if(newTrainings.indexOf(training._id) < 0) {
			newTrainings.push(training._id);
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
		employee.trainings = employee.trainings.filter(t => t._id != training._id);
		employeePagination.count--;
		
		if(employeePagination.count % 5 == 0 && employeePagination.currentPage > 0) employeePagination.currentPage--;
		employeePagination.currentPage = employeePagination.currentPage == 0 ? 1 : employeePagination.currentPage;
		
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

	render() {
		const { user, organization } = this.props;
		const { employee, trainings, pagination } = this.state;
		return (
			<div>
				<Link to={`/${this.props.organization.name.replace(/\s/g, '')}/employees`}>X</Link>
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				<form className='center-align'>
					<Row>
						<h4>Employee Info</h4>	
					</Row>
					<Row>
						<Input s={6} label='First Name' defaultValue={employee.fname} onChange={this.onChange} name='fname' />
						<Input s={6} label='Last Name' defaultValue={employee.lname} onChange={this.onChange} name='lname' />
					</Row>
					<Row>
						<Input s={6} label='Employee ID' defaultValue={employee.employeeID} onChange={this.onChange} name='employeeID' />
						<Input s={6} label='Title' defaultValue={employee.title} onChange={this.onChange} name='title' />
					</Row>
					<Row>
						<Input s={6} label='Account Username' defaultValue={employee.username} onChange={this.onChange} name='username' />
						<Input s={6} label='Default Password' defaultValue={employee.password} onChange={this.onChange} name='password' />
					</Row>
					<Row>
						<h4>Add Trainings</h4>	
					</Row>					
					<Row>
						{this.renderOrganizationCollection(trainings, `${organization.name}'s Trainings`)}
						{this.renderEmployeeCollection()}
					</Row>
					<Button onClick={this.addEmployee}>Add Employee</Button>
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