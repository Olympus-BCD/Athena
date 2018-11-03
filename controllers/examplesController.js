const db = require('../models');

module.exports = {
	findAll: function(req, res) {
		db.Example
			.find(req.query)
			.sort({ date: -1 })
			.then(examples => res.json(examples))
			.catch(err => res.status(422).json(err));
	},
	findById: function(req, res) {
		db.Example
			.findById(req.params.id)
			.then(example => res.json(example))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		db.Example
			.create(req.body)
			.then(example => res.json(example))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		db.Example
		  .findOneAndUpdate({ _id: req.params.id }, req.body)
		  .then(example => res.json(example))
		  .catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		db.Example
			.findById({ _id: req.params.id })
			.then(example => example.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	}
};
