const router = require('express').Router();
const exampleRoutes = require('./examples');

// Example routes ('/api/example'
router.use('/examples', exampleRoutes);

module.exports = router;