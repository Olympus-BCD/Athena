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
	test: (newEmployee, cb) => {
		cb(newEmployee);
	}
};