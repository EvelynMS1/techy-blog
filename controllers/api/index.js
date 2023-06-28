const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const blogRoutes =require('./blogRoutes');
//for user authentication 
router.use('/user', userRoutes);
//for homepage posts and comments
router.use('/comments', commentRoutes);
//for dashboard creating blog posts, delete, updating
router.use('/blog',blogRoutes)

module.exports = router;