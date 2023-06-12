const router = require('express').Router();
const multer = require('multer');

const {
  UserPostRouter,
  UserGetRouter,
  UserLoginRouter,
  UserProfileRouter,
  UserLogoutRouter,
  UserAuthRouter,
} = require('./controllers/userController.js');
const { BlogGetRouter, BlogPostRouter, BlogDeleteRouter, BlogUpdateRouter, BlogGetByIdRouter } = require('./controllers/blogController.js');
const getAuth = require('./middleware/auth');
router.post('/register', UserPostRouter);
router.get('/users', UserGetRouter);
router.post('/login', UserLoginRouter);
router.get('/profile', UserProfileRouter);
router.post('/logout', UserLogoutRouter);
router.get('/auth', getAuth, UserAuthRouter);

router.get('/blog', BlogGetRouter);
router.get('/blog/:id', BlogGetByIdRouter);
router.post('/create', getAuth, BlogPostRouter);
router.delete('/delete', getAuth, BlogDeleteRouter);
router.put('/blog/:id', getAuth, BlogUpdateRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

module.exports = router;
