const router = require('express').Router();
const controller = require('../../controllers/organizationsController');

router.route('/')
	.put(controller.update);

//	('api/organizations/register')
router.route('/register')
	.post(controller.register);
	
//	('api/organizations/validate')
router.route('/validate')
	.post(controller.validate);
	
//	('api/organizations/owner')
router.route('/owner')
	.post(controller.addOwner);

module.exports = router;