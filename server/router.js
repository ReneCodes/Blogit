const router = require('express').Router();
const db = require('./models/index');
const { UserPostRouter, UserGetRouter, UserLoginRouter, UserProfileRouter, UserLogoutRouter } = require('./controllers/userController.js');
const { BlogGetRouter, BlogPostRouter, BlogDeleteRouter, BlogUpdateRouter } = require('./controllers/blogController.js');
const getAuth = require('./middleware/auth');
router.post('/register', UserPostRouter);
router.get('/', UserGetRouter);
router.post('/login', UserLoginRouter);
router.get('/profile', UserProfileRouter);
router.post('/logout', UserLogoutRouter);

router.get('/blog', BlogGetRouter);
router.post('/blog/create', getAuth, BlogPostRouter);
router.delete('/blog/delete', getAuth, BlogDeleteRouter);
router.put('/blog/update', getAuth, BlogUpdateRouter);

module.exports = router;
