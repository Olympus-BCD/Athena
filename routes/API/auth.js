const router = require('express').Router();
const controller = require('../../controllers/authController');

//	('api/auth/login')
router.route('/login')
	.post(controller.login);
	
//	('api/auth/register')
router.route('/register')
	.post(controller.register);

module.exports = router;