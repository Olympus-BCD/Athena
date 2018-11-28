const router = require('express').Router();
const trainingRoutes = require('./trainings');
const authRoutes = require('./auth');
const organizationRoutes = require('./organizations');
const trainingInstancesRoutes = require('./trainingInstances');
const newsfeedRoutes = require('./newsfeed');

// Training routes ('/api/trainings')
router.use('/trainings', trainingRoutes);

//	Auth routes ('api/auth')
router.use('/auth', authRoutes);

//	Organization routes ('/api/organizations')
router.use('/organizations', organizationRoutes);

//	Trainig Instances routes ('/api/traininginstances')
router.use('/traininginstances', trainingInstancesRoutes);

//	Newsfeed routes ('/api/newsfeed')
router.use('/newsfeed', newsfeedRoutes);

module.exports = router;