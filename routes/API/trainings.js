const router = require('express').Router();
const controller = require('../../controllers/trainingsController');

const passport = require('passport');
require('../../config/passport')(passport);

//	('/api/trainings')
router.route('/')
	.get(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.findAll);
	})
	.post(passport.authenticate('jwt', { session: false }), (req, res) => {
		if(req.user.role > 1) {
			requireLogin(req, res, controller.create);
		} else {
			return res.status(403).send({ success: false, msg: 'Unauthorized.' });
		}
	})
	.put(passport.authenticate('jwt', { session: false }), (req, res) => {
		if(req.user.role > 1) {
			requireLogin(req, res, controller.update);
		} else {
			return res.status(403).send({ success: false, msg: 'Unauthorized.' });
		}
	});

//	('/api/trainings/pagination')
router.route('/pagination')
	.get(controller.pagination);
	
//	('/api/trainings/:id')
router.route('/:id')
	.get(passport.authenticate('jwt', { session: false }), (req, res) => {
// 		console.log('params:', req.query);
		requireLogin(req, res, controller.findById);
	})
	.put(controller.update)
	.delete(controller.remove);

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

test = (req, res, next) => {
	console.log('Pagination Request:', req.body);
	next(req, res);
};

module.exports = router;