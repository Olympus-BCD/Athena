const router = require('express').Router();
const controller = require('../../controllers/trainingInstancesController');

const passport = require('passport');
require('../../config/passport')(passport);

//	('/api/traininginstances')
router.route('/')
	.get(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.findAll);
	})
	.post(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.create);
	});
	
//	('/api/traininginstances/:id')
router.route('/:id')
	.get(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.findById);
	})
	.put(passport.authenticate('jwt', { session: false }), (req, res) => {
		console.log('updating instance:', req.body)
		requireLogin(req, res, controller.update);
	});

requireLogin = (req, res, next) => {
	const token = getToken(req.headers);
	if(token) {
		next(req, res);
	} else {
		return res.status(403).send({ success: false, msg: 'Unauthorized.' });
	}
};

getToken = headers => {
	if(headers && headers.authorization) {
		const parted = headers.authorization.split(' ');
		if(parted.length === 2) return parted[1];
		return null;
	}
	return null;
};

module.exports = router;