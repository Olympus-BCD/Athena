const db = require('../models');

module.exports = {
	findAll: function(req, res) {
		const user = req.user
		
		db.Training
			.find(req.query)
			.sort({ date: -1 })
			.then(trainings => res.json({ trainings: trainings, user: user }))
/*
			.then(trainings => {
				console.log('Query: ', req.query);
				res.json({trainings: trainings, user: user});	
			})
*/
			.catch(err => res.status(422).json(err));
	},
	findById: function(req, res) {
		db.Training
			.findById(req.params.id)
			.then(training => res.json(training))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		db.Training
			.create(req.body)
			.then(training => res.json(training))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		db.Training
		  .findOneAndUpdate({ _id: req.params.id }, req.body)
		  .then(training => res.json(training))
		  .catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		db.Training
			.findById({ _id: req.params.id })
			.then(training => training.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	}
};
