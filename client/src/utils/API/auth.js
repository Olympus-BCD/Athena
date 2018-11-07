import axios from 'axios';

export default {
	register: (user) => {
		return axios.post('/api/auth/register', user);
	},
	login: (username, password) => {
		return axios.post('/api/auth/login', { username, password });
	}
};