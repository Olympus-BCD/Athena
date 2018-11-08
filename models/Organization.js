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
	imageURL: {
		type: String,
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