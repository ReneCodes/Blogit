const router = require('express').Router();
const db = require('./models/index');
const { UserPostRouter, UserGetRouter, UserLoginRouter } = require('./controllers/userController.js');
const { BlogGetRouter, BlogPostRouter, BlogDeleteRouter } = require('./controllers/blogController.js');
const getAuth = require('./middleware/auth');
router.post('/user/register', UserPostRouter);
router.get('/user', UserGetRouter);
router.post('/user/login', UserLoginRouter);

router.get('/blog', BlogGetRouter);
router.post('/blog/create', getAuth, BlogPostRouter);
router.delete('/blog/delete', getAuth, BlogDeleteRouter);
module.exports = router;
