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
	
//	('api/auth/user')
router.route('/user')
	.get(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.findById);
	})
	.put(passport.authenticate('jwt', { session: false }), (req, res) => {
/*
		console.log('Role:', req.body);
		return res.json({ success: false, msg: 'tehehe' });
*/
		const putUserIsOwner = req.body.role > 1 ? true : false;
		if(putUserIsOwner && !isOwner(req)) return res.json({ success: false, msg: 'You do not have permission to edit the Owner' });
		if(isAdmin(req)) {
			controller.findOneAndUpdate(req, res);
		} else {
			res.json({ success: false, msg: 'You do not have permission to edit this user' });
		}
	});
	
requireAdmin = (req, res, next) => {
	const token = getToken(req.headers);
	if(token && req.user.role > 1) {
		next(req, res);
	} else if(token) {
		res.json({ success: false, msg: '' });
	}
};

isOwner = (req) => {
	const token = getToken(req.headers);
	if(token && req.user.role > 2) return true;
	return false;
}

isAdmin = (req) => {
	const token = getToken(req.headers);
	if(token && req.user.role > 1) return true;
	return false;
}

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