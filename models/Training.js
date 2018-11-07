const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	__organization: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization',
		required: true
	},
	__creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Training = mongoose.model('Training', TrainingSchema);

module.exports = Training;