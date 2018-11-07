const router = require('express').Router();
const trainingRoutes = require('./trainings');
const authRoutes = require('./auth');
const organizationRoutes = require('./organizations');

// Training routes ('/api/trainings')
router.use('/trainings', trainingRoutes);

//	Auth routes ('api/auth')
router.use('/auth', authRoutes);

//	Organization routes ('/api/organizations')
router.use('/organizations', organizationRoutes);

module.exports = router;