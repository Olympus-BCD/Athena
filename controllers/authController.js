const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);
const User = require('../models').User;
const secret = require('../config/settings').secret;

module.exports = {
	register: (req, res) => {
		if(!req.body.username || !req.body.password) {
			res.json({ success: false, msg: 'Username and password are required.' });
		} else {
			//	As is, if a user tries to register with the same username and password as an existing account, they will simply be logged in
			//	Can keep or change this, but need to update front end error message receiving to identify why registration failed
			//	TODO add both front-end and server-side validations (TIP: use same error reporting objects on both ends to easily display errors)
			//	i.e., { success: false, msg: 'Username is too short' }
			//	For front-end validations, consider using onChange for instant validations
			const user = new User(req.body);
			user.save((err, results) => {
				if(err) return res.json({ success: false, msg: 'Username already exists.' });
				console.log('User created:', results);
				res.json({ success: true, msg: 'New user created.', user: results });
			});		
		}
	},
	login: (req, res) => {
		User.findOne({
			username: req.body.username
		})
		.populate('__organization')
		.then(user => {
			if(!user) {
				res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
			} else {
				//	check if password matches
				user.comparePassword(req.body.password, (err, isMatch) => {
					if(isMatch && !err) {
						//	if user is found and password matches, create a token
						const token = jwt.sign(user.toJSON(), secret);
						//	return the info as JSON, including the token
						res.json({ success: true, token: 'JWT ' + token, msg: '', user: user });
					} else {
						res.status(401).send({ success: false, msg: 'Authentication failed. Password did not match.' });
					}
				});
			}
		}).catch(err => {
			if(err) throw err;
		});
	}
};