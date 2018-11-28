import axios from 'axios';

export default {
	register: (user) => {
		return axios.post('/api/auth/register', user);
	},
	login: (username, password) => {
		return axios.post('/api/auth/login', { username, password });
	},
	getUsers: (params = {}) => {
		return axios.get('/api/auth/users', { params });
	},
	findById: (params = {}) => {
		return axios.get('/api/auth/user', { params });
	},
	update: user => {
		return axios.put('/api/auth/user', user);
	},
	addTrainingToExistingUsers: training => {
		return axios.put('/api/auth/users', training);
	},
	addTrainingInstances: (id, trainingInstancesArr) => {
		console.log(1);
		return axios.put('/api/auth/addtrainings', { userID: id, trainingInstances: trainingInstancesArr });
	},
	addTrainingHours: data => {
		return axios.put('/api/auth/addhours', data);
	},
	test: (newEmployee, cb) => {
		cb(newEmployee);
	}
};