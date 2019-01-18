import axios from 'axios';

export default {
	register: (organization) => {
		return axios.post('/api/organizations/register', { organization });
	},
	validate: (organization, owner) => {
		return axios.post('/api/organizations/validate', { organization, owner });
	},
	addOwner: (organization, owner) => {
		return axios.post('/api/organizations/owner', { organization, owner });
	},
	update: (organization) => {
		return axios.put('/api/organizations', organization);
	}
};