const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const apiRoutes = require("./api");
const profileRoutes = require("./profile-routes.js");
const blogRoutes = require("./blog-routes.js");

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
