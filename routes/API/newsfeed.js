const router = require('express').Router();
const controller = require('../../controllers/newsfeedController');

const passport = require('passport');
require('../../config/passport')(passport);

//	('/api/newsfeed')
router.route('/')
	.get(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.findAll);
	})
	.post(controller.create);
	
//	('/api/newsfeed/:id')
router.route('/:id')
	.get(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.findById);
	});
	
router.route('/_bulk')
	.post(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.insertMany);
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