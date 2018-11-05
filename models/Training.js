const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
	name: { type: String, required: true },
	date: { type: Date, default: Date.now }
});

const Training = mongoose.model('Training', TrainingSchema);

module.exports = Training;