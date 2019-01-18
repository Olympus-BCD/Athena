// React Imports
import React from "react";

// CSS & Local Imports
import API from '../../../../../../../utils/API';
import EmployeeListItem from './EmployeeListItem';
import EmployeesSubHeader from '../../EmployeesSubHeader';
import "./ViewEmployees.css";
import MessageModal from '../../../../../components/MessageModal';

// Dependencies
import moment from 'moment';
import queryString from 'query-string';

class ViewEmployees extends React.Component {
	
	state = {
		message: '',
		employees: [],
		filters: {
			all: false,
			active: false,
			inactive: false,
			overdue: false,
			upcoming: false,
			completed: false,
			expiring: false
		},
		timeframe: {
			weekly: false,
			thirtyDays: true
		},
		searchResults: [],
		searchString: ''
	};
	
	componentDidMount() {
		const qs = queryString.parse(this.props.location.search);
		const filter = qs.filter ? qs.filter : false;
		const timeframe = qs.timeframe ? qs.timeframe : false;
		const availableFilters = Object.keys(this.state.filters);
		const availableTimeframes = Object.keys(this.state.timeframe);
		if(filter && availableFilters.indexOf(filter) >= 0) {
			this.switchTab(filter);
		} else {
			this.switchTab('active')								//	default filter
		}
		if(timeframe && availableTimeframes.indexOf(timeframe) >= 0) {
			this.switchTimeframe(false, timeframe);
		} else {
			this.switchTimeframe(false, 'thirtyDays');				//	default timeframe
		}
		this.getEmployees();
	}

	getEmployees = () => {
		const query = {
			__organization: this.props.organization._id
		};
		API.auth.getUsers(query).then(res => {
			if(res.data.success) {
				console.log('Employees:', res.data.users);
				this.setState({ employees: res.data.users, message: '' });
			} else {
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			console.log(err);
			
			this.setState({ message: 'Uh Oh! Something went wrong!' });
			
		});
	};
	
	switchTab = (override = false) => {
// 		if(e) console.log('e', e);
		const { filters } = this.state;
		filters.all = filters.active = filters.inactive = filters.upcoming = filters.overdue = filters.completed = filters.expiring = false;
// 		const filter = override ? override : e.target.id;
		filters[override] = true;
		this.setState({ filters: filters, message: '', searchResults: [], searchString: '' });
	};
	
	switchTimeframe = (e, override = false) => {
		console.log('e', e);
		console.log(override);
		const { timeframe } = this.state;
		timeframe.weekly = timeframe.thirtyDays = false;
		const tf = e ? e.target.id : override;
		timeframe[tf] = true;
		this.setState({ timeframe: timeframe });
	};
	
	searchEmployees = e => {
		e.preventDefault();
		const { name, value } = e.target;
		const state = this.state;
		state[name] = value;
		this.setState(state);
		const query = e.target.value;
		
		if(value.length > 2) {
			API.auth.wildcardSearch(this.props.organization._id, query).then(res => {
				if(res.data.success) {
					this.setState({ searchResults: res.data.users });
				} else {
					console.log('Error performing search:', res.data.error);
					this.setState({ message: res.data.msg });
				}
			}).catch(err => {
				console.log('Error performing search:', err);
				this.setState({ message: 'Uh Oh! Something went wrong!' });
			});
		} else {
			this.setState({ searchResults: [] });
		}
	};
	
	clearSearch = e => {
		e.preventDefault();
		this.setState({ searchResults: [], searchString: '' });
	};
	
	changeRole = (e, employee) => {
		e.preventDefault();
		if(employee.role >= 3) return this.setState({ message: 'Cannot change that user\'s permission level.' });
		if(employee.employeeActive) {
			employee.role = employee.role == 1 ? 2 : 1;
	// 		return alert(newRole);
			API.auth.update(employee).then(response => {
				if(response.data.success) {
	// 				alert(response.data.user.role);
					if(this.props.user._id == employee._id && employee.role == 1) return this.logout();
					this.getEmployees();
				} else {
					this.setState({ message: response.data.msg });
				}
			}).catch(err => {
				console.log(err);
				this.setState({ message: 'Uh Oh! Something went wrong!' });
			});
		} else {
			this.setState({ message: 'Must activate employee before changing permission levels.' });
		}
	};
	
	deactivateEmployee = (e, employee) => {
		e.preventDefault();
		if(employee.role >= 3) return this.setState({ message: 'Cannot deactivate that user.' });
		employee.role = 1;
		employee.previousActivationStatus = employee.active;
		employee.active = false;
		employee.employeeActive = false;
		API.auth.update(employee).then(response => {
			if(response.data.success) {
				if(this.props.user._id == employee._id) return this.logout();
				this.getEmployees();
			} else {
				this.setState({ message: response.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	reactivateEmployee = (e, employee) => {
		e.preventDefault();
		employee.active = employee.previousActivationStatus;
		employee.employeeActive = true;
		API.auth.update(employee).then(response => {
			if(response.data.success) {
				this.getEmployees();
			} else {
				this.setState({ message: response.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	logout = () => {
		localStorage.removeItem('jwtToken');
// 		window.location.href='/login';
		this.props.history.push(`/login`);
	};
	
	closeMessageModal = () => {
		this.setState({ message: '' })
	};
	
	getSnapshot = (days = 30) => {
		const { employees, searchResults } = this.state;
		const snapshotEmployees = searchResults.length > 0 ? searchResults : employees;
		
// 		const cutOff = moment().add(days, 'days').format('X');
		const cutOff = moment().add(days, 'days').endOf('day').format('X');
		const completedCutOff = days < 8 ? moment().startOf('isoWeek').format('X') : days;
		
		let data = {
			upcomingEmployees: [],
			overdueEmployees: [],
			completedEmployees: [],
			hoursUpcomingEmployees: [],
			allEmployees: [],
			hoursUpcomingCount: 0
		};

		snapshotEmployees.forEach(employee => {
			
			employee.overdueTrainings = [];
			employee.upcomingTrainings = [];
			employee.completedTrainings = [];
			employee.hoursExpiring = false;
				
			if(employee.active) {
				
				employee.trainingInstances.forEach(training => {
					
					if(training.dueDate < moment().startOf('day').format('X') && !training.completed) {
						employee.overdueTrainings.push(training);
						data.overdueCount++;
						data.overdueEmployees.push(employee);
					} else if(training.dueDate < cutOff && !training.completed) {
						employee.upcomingTrainings.push(training);
						data.upcomingCount++;
						data.upcomingEmployees.push(employee);
// 					} else if(training.completed && training.dateCompleted >= moment().subtract(days, 'days').format('X')) {
					} else if(training.completed && training.dateCompleted >= completedCutOff) {
						employee.completedTrainings.push(training);
						data.completedCount++;
						data.completedEmployees.push(employee);
					}
					
				});
			}
			
			if(employee.active && employee.trackHours && employee.hoursResetDate < cutOff) {
				employee.hoursExpiring = true;
				data.hoursUpcomingCount++;
				data.hoursUpcomingEmployees.push(employee);
			}
// 			console.log('Snapshot Employee:', employee);
			data.allEmployees.push(employee);
		});
		
		return data;
	};
	
	render() {
		
		const { employees, message, filters, timeframe, searchResults, searchString } = this.state;
		
		const endOfWorkWeek = moment().endOf('isoWeek');
		const now = moment();
		const days = timeframe.weekly ? endOfWorkWeek.diff(now, 'days') : 30;
		const snapshot = this.getSnapshot(days);
		console.log('Snapshot:', snapshot);
		
		let filteredEmployees = snapshot.allEmployees;
		if(filters.active) filteredEmployees = snapshot.allEmployees.filter(employee => employee.employeeActive);
		if(filters.inactive) filteredEmployees = snapshot.allEmployees.filter(employee => !employee.employeeActive);
		if(filters.overdue) filteredEmployees = snapshot.overdueEmployees;
		if(filters.upcoming) filteredEmployees = snapshot.upcomingEmployees;
		if(filters.completed) filteredEmployees = snapshot.completedEmployees;
		if(filters.expiring) filteredEmployees = snapshot.allEmployees.filter(employee => employee.hoursExpiring);
		if(searchResults.length > 0) filteredEmployees = searchResults;
		console.log('Filtered Employees:', filteredEmployees);
		
		return (
			<div>
				<EmployeesSubHeader
					search={true}
					searchString={searchString}
					searchEmployees={this.searchEmployees}
					clearSearch={this.clearSearch}
					addEmployee={true}
					organization={this.props.organization}
					user={this.props.user}
				/>
				{ message !== '' &&
					<MessageModal message={message} closeMessageModal={this.closeMessageModal} />
				}
				<div className='timeframe-container'>
					<ul className='timeframe-wrapper'>
						<li className={timeframe.weekly ? 'timeframe-selected timeframe' : 'timeframe'} id='weekly' onClick={this.switchTimeframe}>
							This Week
						</li>
						<span className='bar'>|</span>
						<li className={timeframe.thirtyDays ? 'timeframe-selected timeframe' : 'timeframe'} id='thirtyDays' onClick={this.switchTimeframe}>
							Within 30 Days
						</li>
					</ul>
				</div>
				<div className='employeesNav-wrapper'>
					<span className={filters.all ? 'employeesNav-selected navLink' : 'navLink'} id='all' onClick={e => this.switchTab('all')}>All </span><span className='bar'>|</span> 
					<span className={filters.active ? 'employeesNav-selected navLink' : 'navLink'} id='active' onClick={e => this.switchTab('active')}>Active </span><span className='bar'>|</span> 
					<span className={filters.inactive ? 'employeesNav-selected navLink' : 'navLink'} id='inactive' onClick={e => this.switchTab('inactive')}>Inactive</span>
					
					<ul className='training-tabs-wrapper'>
					
						<li className={filters.overdue ? 'navLink tabz employeesNav-selected' : 'navLink tabz'} id='overdue' onClick={e => this.switchTab('overdue')}>
							<i className="material-icons small transparent">warning</i>&nbsp;Overdue{/*snapshot.overdueEmployees.length > 0 && */
							<span>&nbsp;( {snapshot.overdueEmployees.length} )</span>}
						</li>
						<span className='bar'>|</span>
						
						<li className={filters.upcoming ? 'employeesNav-selected navLink tabz' : 'navLink tabz'} id='upcoming' onClick={e => this.switchTab('upcoming')}>
							<i className="material-icons small transparent">notification_important</i>
								&nbsp;Upcoming{/*snapshot.upcomingEmployees.length > 0 && */
							<span onClick={() => this.switchTab(null, 'upcoming')}>&nbsp;( {snapshot.upcomingEmployees.length} )</span>}
						</li>
						<span className='bar'>|</span>
						
						<li className={filters.completed ? 'employeesNav-selected navLink tabz' : 'navLink tabz'} id='completed' onClick={e => this.switchTab('completed')}>
							<i className="material-icons small transparent">check</i>&nbsp;Completed{/*snapshot.completedEmployees.length > 0 && */
							<span>&nbsp;( {snapshot.completedEmployees.length} )</span>}
						</li>
						<span className='bar'>|</span>
						
						<li className={filters.expiring ? 'employeesNav-selected navLink tabz' : 'navLink tabz'} id='expiring' onClick={e => this.switchTab('expiring')}>
							<i className="material-icons small transparent">schedule</i>&nbsp;Expiring Hours{/*snapshot.hoursUpcomingCount > 0 && */
							<span>&nbsp;( {snapshot.hoursUpcomingCount} )</span>}
						</li>
					</ul>
					
					<div className='employeeCount'>{filteredEmployees.length}</div>
					
				</div>
				<div className="row veiwEmployees-wrapper">
					<div className="col s12 m12 employee-padding">
							<ul className="collection z-depth-3">
								{filteredEmployees.map(employee =>
									<EmployeeListItem
										employee={employee}
										organization={this.props.organization}
										changeRole={this.changeRole}
										deactivateEmployee={this.deactivateEmployee}
										reactivateEmployee={this.reactivateEmployee}
									/>
								)}
								{ filteredEmployees.length < 1 &&
									<EmployeeListItem employee={false} />
								}
							</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default ViewEmployees;