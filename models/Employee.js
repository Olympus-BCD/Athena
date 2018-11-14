const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
	fname: {
		type: String
	},
	lname: {
		type: String
	},
	employeeID: {
		type: Number
	},
	__organization: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization',
		required: true
	},
	__user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	date: {
		type: Date,
		default: Date.now
	},
	imageURL: {
		type: String
	}
});

EmployeeSchema.methods.fullName = function() {
	return `${this.fname} ${this.lname}`;
}

module.exports = mongoose.model('Employee', EmployeeSchema);