const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);
const User = require('../models').User;
const secret = require('../config/settings').secret;

module.exports = {
	register: (req, res) => {
		console.log('New User: ', req.body);
		if(!req.body.username || !req.body.password) {
			res.json({ success: false, msg: 'Username and password are required.' });
		} else if(!req.body.__organization) {
			res.json({ success: false, msg: 'Organization not found' })
		} else {
			
			function registerUser() {
				User.findOne({ username: req.body.username, __oganization: `ObjectId(${req.body.__oganization})` }).then(user => {
					if(user) {
						console.log('User exists:', user, req.body);
						res.json({ success: false, msg: 'Username must be unique to the oganization' });
					} else {
						//	As is, if a user tries to register with the same username and password as an existing account, they will simply be logged in
						//	Can keep or change this, but need to update front end error message receiving to identify why registration failed
						//	TODO add both front-end and server-side validations (TIP: use same error reporting objects on both ends to easily display errors)
						//	i.e., { success: false, msg: 'Username is too short' }
						//	For front-end validations, consider using onChange for instant validations
						const user = new User(req.body);
						user.save((err, results) => {
	// 						if(err) return res.json({ success: false, msg: 'Username already exists.' });
							if(err) return res.json({ success: false, msg: err });
							console.log('User created:', results);
							res.json({ success: true, msg: 'New user created.', user: results });
						});
					}
				}).catch(err => {
					if(err) return res.json({ success: false, msg: err._message });
				});	
			}
			
			User.find({ username: req.body.username }).then(users => {
				if(users) {
					var count = 0;
					var matchFound = false;
					var json = {};
					
					function comparePasswords() {
						console.log(`Comparing passwords: ${count} / ${users.length}`);
						console.log(`Match found: ${matchFound}`);
						if(count < users.length) {
							if(!matchFound) {
								users[count].comparePassword(req.body.password, (err, isMatch) => {
									if(isMatch &&!err) {
										matchFound = true;
										json = { success: false, msg: 'Invalid username' };
										count++;
										console.log(`Outcome: Match found, recall`);
										comparePasswords();
									} else {
										if(err) console.log('Error:', err);
										count++;
										console.log(`Outcome: No match found, recall`);
										comparePasswords();
									}
								});
							} else {
								count++;
								comparePasswords();
							}
						} else if(!matchFound) {
							registerUser();
						} else {
							console.log(`Outcome: End of the line, sending JSON (match found)`);
							res.json(json);
						}
					}
					comparePasswords();
				} else {
					registerUser();
				}
			});
			
/*
			User.findOne({ username: req.body.username, __oganization: `ObjectId(${req.body.__oganization})` }).then(user => {
				if(user) {
					console.log('User exists:', user, req.body);
					res.json({ success: false, msg: 'Username must be unique to the oganization' });
				} else {
					//	As is, if a user tries to register with the same username and password as an existing account, they will simply be logged in
					//	Can keep or change this, but need to update front end error message receiving to identify why registration failed
					//	TODO add both front-end and server-side validations (TIP: use same error reporting objects on both ends to easily display errors)
					//	i.e., { success: false, msg: 'Username is too short' }
					//	For front-end validations, consider using onChange for instant validations
					const user = new User(req.body);
					user.save((err, results) => {
// 						if(err) return res.json({ success: false, msg: 'Username already exists.' });
						if(err) return res.json({ success: false, msg: err });
						console.log('User created:', results);
						res.json({ success: true, msg: 'New user created.', user: results });
					});
				}
			}).catch(err => {
				if(err) return res.json({ success: false, msg: err._message });
			});	
*/	
		}
	},
	login: (req, res) => {
		User.find({
			username: req.body.username
		})
		.populate('__organization')
		.then(users => {
			if(!users) {
				return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
			} else {
				//	Use recursion for async loop through DB results
				//	This is probably a terrible way of handling this, but this is done so that:
				//		1) usernames only have to be unique within a single organization (other organizations can use that username)
				//		2) The user does not have to supply which organization they belong to in order to login
				//	The only caveat to this is that a single username - password combination cannot be duplicated across organizations
				var count = 0;
				var responseSent = false;
				var json = {};
				function comparePasswords() {
					console.log(`Comparing passwords: ${count} / ${users.length}`);
					console.log(`response sent: ${responseSent}`);
					if(count < users.length) {
						if(!responseSent) {
							users[count].comparePassword(req.body.password, (err, isMatch) => {
								if(isMatch &&!err) {
									const token = jwt.sign(users[count].toJSON(), secret);
									responseSent = true;
									json = { success: true, token: 'JWT ' + token, msg: '', user: users[count] };
									count++;
									console.log(`Outcome: Successful login, recall`);
									comparePasswords();
								} else {
									if(err) console.log('Error:', err);
									count++;
									console.log(`Outcome: Unsuccessful, recall`);
									comparePasswords();
								}
							});
						} else {
							count++;
							comparePasswords();
						}
					} else if(!responseSent) {
						console.log(`Outcome: Unsuccessful, no recall`);
						res.json({ success: false, msg: 'Authentication failed. Username and password do not match.' });
					} else {
						console.log(`Outcome: End of the line, sending JSON (should be successful)`);
						res.json(json);
					}
				}
				comparePasswords();
				
				//	check if password matches 	//	this was used in conjuction with User.findOne({ username: req.body.username })
/*
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
*/
			}
		}).catch(err => {
			if(err) throw err;
		});
	},
	findAll: (req, res) => {
		User
			.find(req.query)
			.sort({ username: 1 })
			.then(users => res.json({ success: true, users: users }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to retrieve users' }));
	}
};