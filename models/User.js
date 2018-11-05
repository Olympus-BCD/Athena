const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: Number,
		default: 1
	}
});

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

module.exports = mongoose.model('User', UserSchema);