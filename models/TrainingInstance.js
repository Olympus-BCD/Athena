const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const TrainingInstanceSchema = new Schema({
	name: {
		type: String,
		required: true
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
	__training: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Training'
	},
	date: {
		type: Date,
		default: Date.now
	},
	trainingCode: {
		type: String
	},
	hours: {
		type: Number,
		default: 0
	},
	recurring: {
		type: Boolean,
		default: false
	},
	frequencyNumber: {
		type: Number
	},
	frequencyPeriod: {
		type: String
	},
/*
	documents: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Document',
	},
*/
	completed: {
		type: Boolean,
		default: false
	},
	dateCompleted: {
		type: Number
	},
	dueDate: {
		type: Number,
		default: moment().format('X')
	}
});

const TrainingInstance = mongoose.model('TrainingInstance', TrainingInstanceSchema);

module.exports = TrainingInstance;