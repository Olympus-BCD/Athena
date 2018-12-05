const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	__organization: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization',
		required: true
	},
	role: {
		type: Number,
		default: 1
	},
	active: {
		type: Boolean,
		default: true
	},
	employeeActive: {
		type: Boolean,
		default: true
	},
	previousActivationStatus: {
		type: Boolean,
		default: true
	},
	trainings: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Training'
	}],
	trainingInstances: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TrainingInstance'
	}],
	employeeID: {
		type: String
	},
	title: {
		type: String
	},
	department: {
		type: String
	},
	fname: {
		type: String
	},
	lname: {
		type: String
	},
	imageURL: {
		type: String,
		default: 'https://res.cloudinary.com/blnicholson/image/upload/v1543546473/qbswekpy1p0y1cknkkpe.png'
	},
	hireDate: {
		type: Number,
		default: 0
	},
	trackHours: {
		type: Boolean,
		default: false
	},
	trackingFrequencyNumber: {
		type: Number,
		default: 1
	},
	trackingFrequencyPeriod: {
		type: String,
		default: 'year'
	},
	currentHours: {
		type: Number,
		default: 0
	},
	totalHours: {
		type: Number,
		default: 0
	},
	hoursResetDate: {
		type: Number,
		default: 0
	},
	trackingDate: {
		type: Number
	},
	date: {
		type: Date,
		default: Date.now
	}
});

UserSchema.index({ username: 'text', fname: 'text', lname: 'text', employeeID: 'text', title: 'text', department: 'text' });

UserSchema.pre('save', function(next) {
	const user = this;
	if(this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, (err, salt) => {
			if(err) return next(err);
			bcrypt.hash(user.password, salt, null, (err, hash) => {
				if(err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

UserSchema.methods.comparePassword = function(password, cb) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

UserSchema.methods.fullName = function() {
	return `${this.fname} ${this.lname}`;
}

module.exports = mongoose.model('User', UserSchema);