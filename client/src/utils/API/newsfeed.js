import axios from 'axios';

export default {
	getNewsfeedItems: (params = {}) => {
		return axios.get('/api/newsfeed', { params });
	},
	create: newsfeedItem => {
		return axios.post('/api/newsfeed', newsfeedItem);
	},
	insertMany: newsfeedItems => {
		return axios.post('/api/newsfeed/_bulk', newsfeedItems);
	}
};