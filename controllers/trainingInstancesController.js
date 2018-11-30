const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');

module.exports = {
	findAll: function(req, res) {
		db.TrainingInstance
			.find(req.query)
			.sort({ date: 1 })
			.then(trainings => res.json({ success: true, trainingInstances: trainings }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to find training instance', error: err }));
	},
	findById: (req, res) => {
		db.TrainingInstance
			.findById(req.query.id)
			.then(training => res.json({ success: true, trainingInstance: training }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to find training instance', error: err }));
	},
	create: function(req, res) {
		console.log('Creating Instance:', req.body);
		db.TrainingInstance
			.create(req.body)
			.then(training => {
				res.json({ success: true, msg: '', trainingInstance: training })
			})
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to create training instance.', error: err }));
	},
	update: function(req, res) {
		console.log('Update training request:', req.body);
		console.log('ID:', req.params.id);
// 		return res.json({ success: true, trainingInstance: 'jasfojaewoif' });
		db.TrainingInstance
		  .findOneAndUpdate({ _id: req.params.id }, req.body.query)
		  .then(training => { console.log('Training Updated:', training); res.json({ success: true, trainingInstance: training }) } )
		  .catch(err => res.status(422).json({ success: false, msg: 'Failed to update training instance.', error: err }));
	},
	remove: function(req, res) {
		db.TrainingInstance
			.findById({ _id: req.params.id })
			.then(training => training.remove())
			.then(dbModel => res.json({ success: true, dbModel }))
			.catch(err => res.status(422).json({ success: false, msg: 'Failed to remove training instance.', error: err }));
	}
};
