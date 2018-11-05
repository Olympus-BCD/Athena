import axios from 'axios';

export default {
	register: (username, password) => {
		return axios.post('/api/auth/register', { username, password })
	},
	login: (username, password) => {
		return axios.post('/api/auth/login', { username, password });
	}
};