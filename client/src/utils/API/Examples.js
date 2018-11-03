import axios from 'axios';

export default {
	getExamples: function() {
		return axios.get('/api/examples');
	},
	getExample: function(id) {
		return axios.get('/api/examples/' + id);
	},
	deleteExample: function(id) {
		return axios.delete('/api/examples/' + id);
	},
	saveExample: function(newExample) {
		return axios.post('/api/examples', newExample);
	}
};