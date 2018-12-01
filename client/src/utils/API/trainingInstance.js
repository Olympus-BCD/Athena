import axios from 'axios';

export default {
	getTrainingInstances: (params = {}) => {
		return axios.get('/api/traininginstances', { params });
	},
	create: trainingInstance => {
		return axios.post('/api/traininginstances', trainingInstance);
	},
	update: (trainingInstance) => {
		return axios.put('/api/traininginstances/' + trainingInstance._id, trainingInstance);
	},
	addDocument: (id, document) => {
		return axios.put('/api/traininginstances/' + id, { $push: { documents: document }});
	}
};