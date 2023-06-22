import {Router, Request, Response} from 'express';
import multer from 'multer';
import {RequestHandler} from 'express';

import {
	createNewUser,
	findAllUsers,
	loginUser,
	findUserById,
	updateUserProfile,
	authenticateUser,
	deleteUser,
} from './controllers/userController.js';

import {
	blogGetRouter,
	blogPostRouter,
	blogDeleteRouter,
	blogUpdateRouter,
	blogGetByIdRouter,
} from './controllers/blogController';

import {getAuth} from './middleware/auth';

const router = Router();
// UserController
router.post('/register', createNewUser as RequestHandler);
router.get('/users', findAllUsers as RequestHandler);
router.post('/login', loginUser as RequestHandler);
router.get('/profile/:id', findUserById as RequestHandler);
router.put('/profile/:id', getAuth, updateUserProfile as RequestHandler);
router.get('/auth', getAuth, authenticateUser as RequestHandler);
router.delete('/profile/:id', getAuth, deleteUser as RequestHandler);
// BlogController
router.get('/blog', blogGetRouter as RequestHandler);
router.get('/blog/:id', blogGetByIdRouter as RequestHandler);
router.post('/create', getAuth, blogPostRouter as RequestHandler);
router.delete('/blog/:id', getAuth, blogDeleteRouter as RequestHandler);
router.put('/edit/:id', getAuth, blogUpdateRouter as RequestHandler);

const storage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb: Function) => {
		cb(null, 'Images');
	},
	filename: (req: Request, file: Express.Multer.File, cb: Function) => {
		cb(null, req.body.name);
	},
});

const upload = multer({storage: storage});
router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
	res.status(200).json('File has been uploaded');
});

module.exports = router;
