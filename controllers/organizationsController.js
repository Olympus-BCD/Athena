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
	}
};