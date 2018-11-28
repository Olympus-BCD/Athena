import axios from 'axios';

export default {
	getTrainingInstances: (params = {}) => {
		return axios.get('/api/traininginstances', { params });
	},
	create: trainingInstance => {
		return axios.post('/api/traininginstances', trainingInstance);
	}
};