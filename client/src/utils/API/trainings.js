import axios from 'axios';

export default {
	getTrainings: () => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		return axios.get('/api/trainings');
	}
};