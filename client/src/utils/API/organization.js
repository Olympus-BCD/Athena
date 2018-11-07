import axios from 'axios';

export default {
	register: (organization) => {
		return axios.post('/api/organizations/register', { organization });
	},
	addOwner: (organization, owner) => {
		return axios.post('/api/organizations/owner', { organization, owner });
	}
};