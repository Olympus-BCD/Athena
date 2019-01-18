const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsfeedItemSchema = new Schema({
	__user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	__organization: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization',
		required: true
	},
	__trainingInstance: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TrainingInstance'
	},
	trainingName: {
		type: String
	},
	userFirstName: {
		type: String
	},
	userLastName: {
		type: String
	},
	imageURL: {
		type: String,
		default: 'https://res.cloudinary.com/blnicholson/image/upload/v1543546473/qbswekpy1p0y1cknkkpe.png'
	},
	organizationName: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	activityType: {
		type: String
	},
	private: {
		type: Boolean,
		default: false
	},
	completedTrainings: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TrainingInstance'
	}],
	numberOfCompletedTrainings: {
		type: Number
	},
	title: {
		type: String
	},
	body: {
		type: String
	}
});

const NewsfeedItem = mongoose.model('NewsfeedItem', NewsfeedItemSchema);

module.exports = NewsfeedItem;