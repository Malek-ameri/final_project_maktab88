const router = require('express').Router();
const authRoutes = require('./auth.route');
const accountRoutes = require('./user.route');
const viewRoutes = require('./view.route');

router.use('/',viewRoutes)
router.use('/auth', authRoutes);
router.use('/user', accountRoutes);

module.exports = router;
