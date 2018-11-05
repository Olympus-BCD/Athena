const router = require('express').Router();
const trainingRoutes = require('./trainings');
const authRoutes = require('./auth');

// Training routes ('/api/trainings')
router.use('/trainings', trainingRoutes);

//	Auth routes ('api/auth')
router.use('/auth', authRoutes);

module.exports = router;