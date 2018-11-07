const router = require('express').Router();
const controller = require('../../controllers/organizationsController');

//	('api/organizations/register')
router.route('/register')
	.post(controller.register);
	
//	('api/organizations/owner')
router.route('/owner')
	.post(controller.addOwner);

module.exports = router;