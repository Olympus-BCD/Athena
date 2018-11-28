import axios from 'axios';

export default {
	getNewsfeedItems: (params = {}) => {
		return axios.get('/api/newsfeed', { params });
	},
	create: trainingInstance => {
		return axios.post('/api/newsfeed', trainingInstance);
	},
	insertMany: trainingInstances => {
		return axios.post('/api/newsfeed/_bulk', trainingInstances);
	}
};