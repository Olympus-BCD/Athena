const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');

module.exports = {
	findAll: function(req, res) {
		const user = req.user
		
		db.Training
			.find(req.query)
			.sort({ date: -1 })
			.then(trainings => res.json({ success: true, trainings: trainings, user: user }))
/*
			.then(trainings => {
				console.log('Query: ', req.query);
				res.json({trainings: trainings, user: user});	
			})
*/
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to find trainings.', error: err}));
	},
	findById: (req, res) => {
		db.Training
			.findById(req.query.id)
			.then(training => res.json({ success: true, training: training }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to find training' }));
	},
	create: function(req, res) {
		db.Training
			.create(req.body)
			.then(training => {
				res.json({ success: true, msg: '', training: training })
			})
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to create training.', error: err }));
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
	},
	pagination: function(req, res) {
		console.log('Pagination Request:', req.query);
		db.Training
			.find({ __organization: ObjectId(req.query.organization) })
			.limit(parseInt(req.query.limit))
			.skip(parseInt(req.query.offset))
			.sort({ name: 'asc' })
			.then(trainings => {
				db.Training.count({ __organization: ObjectId(req.query.organization) })
					.then(count => {
						console.log(`Looked for Organization ID ${req.query.organization}.  Found: ${count}`);
						res.json({
							success: true,
							message: 'Trainings found.',
							trainings: trainings,
							count: count
						});
					})
			})
			.catch(err => {
				console.log(err);
				res.status(422).json({ success: false, message: 'Trainings not found.', error: err })
				});
	}
};
