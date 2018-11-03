const router = require('express').Router();
const examplesController = require('../../controllers/examplesController');

//	('/api/examples')
router.route('/')
	.get(examplesController.findAll)
	.post(examplesController.create);

//	('/api/examples/:id')
router.route('/:id')
	.get(examplesController.findById)
	.put(examplesController.update)
	.delete(examplesController.remove);

module.exports = router;
