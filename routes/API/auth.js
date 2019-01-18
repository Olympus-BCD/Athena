const router = require('express').Router();
const controller = require('../../controllers/authController');
const passport = require('passport');

//	('api/auth/login')
router.route('/login')
	.post(controller.login);
	
//	('api/auth/register')
router.route('/register')
	.post(controller.register);
	
//	('api/auth/:id')
router.route('/:id')
	.put()
	
//	('api/auth/users')
router.route('/users')
	.get(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.findAll);
	})
	.put(passport.authenticate('jwt', { session: false }), (req, res) => {
		if(isAdmin(req)) {
			res.json({ success: false, msg: 'TODO: add this functionality!!!' });
		} else {
			res.json({ success: false, msg: 'You do not have permission to add trainings to users.' });
		}
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
		const putUserIsOwner = req.body.role > 2 ? true : false;
		if(putUserIsOwner && !isOwner(req)) return res.json({ success: false, msg: 'You do not have permission to edit the Owner' });
		if(isAdmin(req) || req.body._id == req.user._id) {
			controller.findOneAndUpdate(req, res);
		} else {
			res.json({ success: false, msg: 'You do not have permission to edit this user' });
		}
	});
	
router.route('/addhours')
	.put(passport.authenticate('jwt', { session: false }), (req, res) => {
		console.log('Add Hours PUT request received.', req.body);
		requireLogin(req, res, controller.addHours);
	});
	
router.route('/addtrainings')
	.put(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.addTrainingInstances);
	});
	
router.route('/search')
	.post(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.search);
	});

router.route('/wildcard')
	.post(passport.authenticate('jwt', { session: false }), (req, res) => {
		requireLogin(req, res, controller.wildcardSearch);
	})
		
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