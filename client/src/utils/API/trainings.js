import axios from 'axios';

export default {
	getTrainings: (params = {}) => {
		console.log('getTrainings(params):', params);
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		return axios.get('/api/trainings', { params });
	},
	addTraining: newTraining => {
		return axios.post('/api/trainings', newTraining);
	}
};