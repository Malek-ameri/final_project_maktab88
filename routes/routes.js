const router = require('express').Router();
const authRoutes = require('./auth.route');
const viewRoutes = require('./view.route');

router.use('/',viewRoutes)
router.use('/auth', authRoutes);

module.exports = router;
