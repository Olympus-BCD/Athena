const Organization = require('../models').Organization;
const models = require('../models');

module.exports = {
	register: (req, res) => {
		if(!req.body.organization) {
			res.json({ success: false, msg: 'Organization name is required.' });
		} else {
			const name = req.body.organization;
			const organization = new Organization({
				name: name,
				passwordDefault: `${name.replace(/\s/g, '').trim().toLowerCase()}123`
			});
// 			console.log(models);
			organization.save((err, results) => {
				if(err) return res.json({ success: false, msg: 'That organization already exists.' });
				console.log('Organization created:', results);
				res.json({ success: true, msg: 'Organization created.', organization: results });
			});		
		}
	},
	addOwner: (req, res) => {
		Organization.findOneAndUpdate({ _id: req.body.organization._id}, { $set: { __owner: req.body.owner._id }, $push: { users: req.body.owner._id } }, { new: true })
			.then(organization => {
				res.json({ success: true, msg: `Owner added to ${organization.name}.`, organization: organization });
			})
			.catch(err => {
				res.json({ success: false, msg: 'Error updating owner.', error: err });
			});
		//
	},
	validate: (req, res) => {
		
		let errMsgs = [];
		if(!req.body.organization) errMsgs.push('Organization name is required.');
		if(!req.body.owner.fname || !req.body.owner.lname) errMsgs.push('First and Last name are required.');
		if(!req.body.owner.username || !req.body.owner.password) errMsgs.push('Username and password are required.');
		
		//	Add additional validations here...
		
		Organization.findOne({ name: req.body.organization })
			.then(organization => {
				if(organization) errMsgs.push('Organization name already exists.');
				usernameAndPasswordCombinationIsUnique(req.body.owner.username, req.body.owner.password, matchFound => {
					if(matchFound) errMsgs.push('Unable to validate username and password combination.');
					if(errMsgs.length == 0) return res.json({ success: true });
					res.json({ success: false, msg: 'Please fix the following errors:', validationErrors: errMsgs });
				});
			})
			.catch(err => {
				res.json({ success: false, msg: 'Uh Oh! Something went wrong! Unable to validate organization.', error: err });
			});
	},
	update: (req, res) => {
		console.log('Org:', req.body);
		Organization
// 			.findOneAndUpdate({ _id: req.body._id }, { $set: { imageURL: req.body.imageURL }}, { new: true })
			.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
			.then(user => res.json({ success: true, organization: organization }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to update organization.', error: err }));
	}
};

function usernameAndPasswordCombinationIsUnique(username, password, cb) {
	
	console.log(`Searching for username-password combinations (${username}, ${password})`);
	
	models.User.find({ username: username }).then(users => {
		if(users) {
			console.log(`${users.length} users found`);
			var count = 0;
			var matchFound = false;
			var errors = [];
			
			function comparePasswords() {
				console.log(`Comparing passwords: ${count} / ${users.length}`);
				console.log(`Match found: ${matchFound}`);
				if(count < users.length) {
					if(!matchFound) {
						users[count].comparePassword(password, (err, isMatch) => {
							if(isMatch &&!err) {
								matchFound = true;
// 								json = { success: false, msg: 'Invalid username' };
								errors.push('Username must be unique.');
								count++;
								console.log(`Outcome: Match found, recall`);
								comparePasswords();
							} else {
								if(err) console.log('Error:', err);
								count++;
								console.log(`Outcome: No match found (error), recall`);
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
					cb(matchFound);
				} else {
					console.log(`Outcome: End of the line. Match found, ${username} and password combo already exist.`);
					cb(matchFound);
				}
			}
			comparePasswords();
		} else {
			console.log(`No users with the username ${username} found.`);
			cb(matchFound);
		}
	});
}