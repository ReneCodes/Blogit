const router = require('express').Router();
const multer = require('multer');
const { UserPostRouter, UserGetRouter, UserLoginRouter, UserProfileRouter, UserLogoutRouter } = require('./controllers/userController.js');
const { BlogGetRouter, BlogPostRouter, BlogDeleteRouter, BlogUpdateRouter } = require('./controllers/blogController.js');
const getAuth = require('./middleware/auth');
router.post('/register', UserPostRouter);
router.get('/', UserGetRouter);
router.post('/login', UserLoginRouter);
router.get('/profile', UserProfileRouter);
router.post('/logout', UserLogoutRouter);

router.get('/blog', BlogGetRouter);
router.post('/create', getAuth, BlogPostRouter);
router.delete('/blog/delete', getAuth, BlogDeleteRouter);
router.put('/blog/:id', getAuth, BlogUpdateRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    cb(null, 'hello.jpeg');
  },
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});
module.exports = router;
