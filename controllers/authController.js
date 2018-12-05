const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);
const User = require('../models').User;
const secret = require('../config/settings').secret;

module.exports = {
	register: (req, res) => {
		if(!req.body.username || !req.body.password) {
			res.json({ success: false, msg: 'Username and password are required.' });
		} else if(!req.body.__organization) {
			res.json({ success: false, msg: 'Organization not found' })
		} else {
			function registerUser() {
				console.log(`Register user: ${req.body.username}.`);
				console.log(`Searching for username and organization combo (${req.body.username}, ${req.body.__organization}).`);
				console.log(`Object Type Organization: ${require('mongoose').Types.ObjectId(req.body.__organization)}`, req.body.__organization);
// 				User.findOne({ username: req.body.username, role: 3 }).then(user => {
				User.findOne({ $and: [{ username: req.body.username }, { __organization: require('mongoose').Types.ObjectId(req.body.__organization) }]}).then(user => {
					console.log('Search finished.');
					if(user) {
						console.log('User exists:', user, req.body);
						res.json({ success: false, msg: 'Username must be unique to the oganization' });
					} else {
						console.log(`No matches found for organization ${req.body.__organization}.`);
						console.log('Creating new user.');
						//	As is, if a user tries to register with the same username and password as an existing account, they will simply be logged in
						//	Can keep or change this, but need to update front end error message receiving to identify why registration failed
						//	TODO add both front-end and server-side validations (TIP: use same error reporting objects on both ends to easily display errors)
						//	i.e., { success: false, msg: 'Username is too short' }
						//	For front-end validations, consider using onChange for instant validations
						const user = new User(req.body);
						user.save((err, results) => {
	// 						if(err) return res.json({ success: false, msg: 'Username already exists.' });
							if(err) return res.json({ success: false, msg: 'Unable to save user info.', error: err });
							console.log('User created:', results);
							res.json({ success: true, msg: 'New user created.', user: results });
						});
					}
				}).catch(err => {
					if(err) return res.json({ success: false, msg: err._message, error: err });
				});	
			}
			
			console.log('Searching for users:', req.body.username);
			User.find({ username: req.body.username }).then(users => {
				if(users) {
					console.log(`${users.length} users found`);
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
								console.log(`Match previously found. Finishing iterations`);
								count++;
								comparePasswords();
							}
						} else if(!matchFound) {
							console.log('Finished all iterations. No match found.');
							registerUser();
						} else {
							console.log(`Outcome: End of the line, sending JSON (match found, ${req.body.username} and password combo already exist)`);
							res.json(json);
						}
					}
					comparePasswords();
				} else {
					console.log(`No users with the username ${req.body.username} found.`);
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
									if(users[count].active) {
										const token = jwt.sign(users[count].toJSON(), secret);
										responseSent = true;
										json = { success: true, token: 'JWT ' + token, msg: '', user: users[count] };
										count++;
										console.log(`Outcome: Successful login, recall`);
										comparePasswords();
									} else {
										console.log(`Outcome: Account innactive, recall`);
										count++
										comparePasswords();
									}
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
			.populate('trainingInstances')
			.sort({ role: -1, employeeActive: 1, lname: 1, fname: 1})
// 			.sort({ username: 1 })
			.then(users => res.json({ success: true, users: users }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to retrieve users' }));
	},
	findById: (req, res) => {
		User
			.findById(req.query.id)
			.populate({ path: 'trainingInstances', options: { sort: { completed: 1, dateCompleted: 1, dueDate: 1 }}})
			.then(user => res.json({ success: true, user: user }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to find user' }));
	},
	findOneAndUpdate: (req, res) => {
		User
			.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
// 			.populate({ path: 'trainingInstances', options: { sort: {"hours": "descending"}}})
			.populate({ path: 'trainingInstances', options: { sort: { hours: -1 }}})
			.then(user => res.json({ success: true, user: user }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to update user' }));
	},
	addTrainingInstances: (req, res) => {
		User
			.update({ _id: req.body.userID}, { $push: { trainingInstances: { $each: req.body.trainingInstances }}}, { new: true })
			.then(user => {
				console.log(4);
				if(!user) return res.json({ success: false, msg: 'User not found.', error: false });
				res.json({ success: true, user: user });
			})
			.catch(err => {
				console.log('Error adding training Instances:', err);
				res.json({ success: false, msg: 'Failed to add training instances to user.', error: err });
			});
	},
	addHours: (req, res) => {
		console.log('Attempting to add hours. Request body:', req.body);
		User
			.findById(req.body.userID)
			.then(user => {
				if(!user) return res.json({ success: false, msg: 'User not found.', error: false });
				if( user && !user.trackHours) return res.json({ success: true, user: user });
				console.log('User, ' + user.username + ', found. Adding ' + req.body.hours + ' hours.');
				user.currentHours += req.body.hours;
				user.save((err, results) => {
					if(err) console.log('Error saving user\'s hours:', err);
					if(err) return res.json({ success: false, msg: 'Unable to save user hours.', error: err });
					console.log(`Added ${req.body.hours} hours to user. (${results.currentHours} / ${results.totalHours})`);
					res.json({ success: true, msg: `Added ${req.body.hours} hours to user. (${results.currentHours} / ${results.totalHours})`, user: results });
				});
			})
			.catch(err => {
				console.log('Error adding training hours:', err);
				res.json({ success: false, msg: 'Failed to update user\'s hours' })
			});
	},
	search: (req, res) => {
		User
			.find({ __organization: req.body.organizationID, $text: { $search: req.body.queryString }})
			.populate('trainingInstances')
// 			.sort({ role: -1, employeeActive: 1, lname: 1, fname: 1})
			.then(users => res.json({ success: true, users: users }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to search for users', error: err }));
	},
	wildcardSearch: (req, res) => {
		User
			.find({
				$and: [
					{ __organization: req.body.organizationID },
					{ $or: [
						{ fname: { $regex: req.body.queryString, $options: 'i' } },
						{ lname: { $regex: req.body.queryString, $options: 'i' } },
						{ username: { $regex: req.body.queryString, $options: 'i' } },
						{ employeeID: { $regex: req.body.queryString, $options: 'i' } },
						{ title: { $regex: req.body.queryString, $options: 'i' } },
						{ department: { $regex: req.body.queryString, $options: 'i' } }
					]}
				]
			})
			.populate('trainingInstances')
			.then(users => res.json({ success: true, users: users }))
			.catch(err => res.json({ success: false, msg: 'Failed to search for users.', error: err }));
	}
};
