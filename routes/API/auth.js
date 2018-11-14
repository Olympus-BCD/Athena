const router = require('express').Router();
const controller = require('../../controllers/authController');
const passport = require('passport');

//	('api/auth/login')
router.route('/login')
	.post(controller.login);
	
//	('api/auth/register')
router.route('/register')
	.post(controller.register);
	
//	('api/auth/users')
router.route('/users')
	.get(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.findAll);
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