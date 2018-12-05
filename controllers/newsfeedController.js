const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');

module.exports = {
	findAll: function(req, res) {
		db.NewsfeedItem
			.find(req.query)
/*
			.populate('__training')
			.populate('__user')
*/
			.populate('__user')
			.sort({ date: -1 })
			.then(newsfeedItems => res.json({ success: true, newsfeedItems: newsfeedItems }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to find newsfeed items', error: err }));
	},
	findById: (req, res) => {
		db.NewsfeedItem
			.findById(req.query.id)
			.then(newsfeedItem => res.json({ success: true, newsfeedItem: newsfeedItem }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to find newsfeed item', error: err }));
	},
	create: function(req, res) {
		db.NewsfeedItem
			.create(req.body)
			.then(newsfeedItem => {
				res.json({ success: true, msg: '', newsfeedItem: newsfeedItem })
			})
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to create newsfeed item.', error: err }));
	},
	update: function(req, res) {
		db.NewsfeedItem
		  .findOneAndUpdate({ _id: req.params.id }, req.body)
		  .then(newsfeedItem => res.json({ success: true, newsfeedItem: newsfeedItem }))
		  .catch(err => res.status(422).json({ success: false, msg: 'Failed to update newsfeed item.', error: err }));
	},
	remove: function(req, res) {
		db.NewsfeedItem
			.findById({ _id: req.params.id })
			.then(newsfeedItem => newsfeedItem.remove())
			.then(dbModel => res.json({ success: true, dbModel }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to remove newsfeed item.', error: err }));
	},
	insertMany: function(req, res) {
		db.NewsfeedItem
			.insertMany(req.body)
			.then(newsfeedItems => res.json({ success: true, newsfeedItems: newsfeedItems }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to create newsfeed items.', error: err }));
	}
};
