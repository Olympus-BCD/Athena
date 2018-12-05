const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrganizationSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	__owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	users: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	usernamePrefix: {
		type: String,
		default: null
	},
	passwordDefault: {
		type: String,
		default: null
	},
	imageURL: {
		type: String,
		default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZyNbZmbnxtSYFGtUdvy9rq4Nowo0GLbyGPbJXGMr4S5fx_r4o'
	},
	date: {
		type: Date,
		default: Date.now
	}
});

/*
Organization.find().populate('owner').then(organization => {
	console.log(organization);
});
*/

module.exports = mongoose.model('Organization', OrganizationSchema);