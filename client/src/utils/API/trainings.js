import axios from 'axios';

export default {
	getTrainings: (params = {}) => {
		console.log('getTrainings(params):', params);
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		return axios.get('/api/trainings', { params });
	},
	addTraining: newTraining => {
		return axios.post('/api/trainings', newTraining);
	},
	pagination: (organization, limit, offset) => {
		const params = {
			organization: organization._id,
			limit: limit,
			offset: offset
		}
		console.log('limit/offset', params);
		return axios.get('/api/trainings/pagination', { params });
	}
};