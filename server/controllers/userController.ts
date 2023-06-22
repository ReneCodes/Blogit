import {Request, Response} from 'express';

import User from '../models/User';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

interface AuthenticatedRequest extends Request {
	userId: string;
	auth?: any;
}

export async function createNewUser(req: Request, res: Response) {
	const {email, password} = req.body;
	const user = await User.findOne({email: email});
	if (user) return res.status(409).send({error: '409', message: 'User already exists'});
	try {
		if (password === '') throw new Error();
		const hash = await bcrypt.hash(password, 10);
		const newUser = new User({
			...req.body,
			password: hash,
		});
		const user = await newUser.save();

		res.status(201).send(user);
	} catch (error) {
		res.status(400).send({error, message: 'Could not create user'});
	}
}

export async function findAllUsers(req: Request, res: Response) {
	try {
		const user = await User.find();
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({error: error});
	}
}

export async function loginUser(req: Request, res: Response) {
	try {
		const {username, password} = req.body;
		const userDoc = await User.findOne({username});
		if (!userDoc) {
			return res.status(400).json('Wrong credentials!');
		}

		const passOk = await bcrypt.compare(password, userDoc.password);
		if (!passOk) {
			return res.status(400).json('Wrong credentials!');
		}

		const token = jwt.sign({username, id: userDoc._id}, process.env.SECRET);
		res.status(201).json({msg: 'logged in', token: token, username});
	} catch (error) {
		res.status(400).json({error: error});
	}
}

export async function findUserById(req: Request, res: Response) {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
}

const response = (res: Response, status: number, result: any) => {
	res.status(status).json(result);
};

export async function updateUserProfile(req: Request, res: Response) {
	// const { username, image, password, email } = req.body;

	if (req.body.password) {
		const salt = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(req.body.password, salt);
	}
	if (!req.body.password) {
		req.body.password = (req as AuthenticatedRequest).auth.password;
	}
	if (!req.body.username) {
		req.body.username = (req as AuthenticatedRequest).auth.username;
	}
	if (!req.body.email) {
		req.body.email = (req as AuthenticatedRequest).auth.email;
	}

	await User.findByIdAndUpdate(
		{author: (req as AuthenticatedRequest).userId, _id: req.params.id},
		{
			$set: req.body,
		}
	)
		.then((result) => response(res, 200, {msg: 'user updated', user: result}))
		.catch((error) => response(res, 400, error));
}

export async function authenticateUser(req: Request, res: Response) {
	res.status(200).json((req as AuthenticatedRequest).auth);
}

export async function deleteUser(req: Request, res: Response) {
	// const { username, image, password, email } = req.body;

	await User.findByIdAndDelete({
		author: (req as AuthenticatedRequest).userId,
		_id: req.params.id,
	})
		.then((result) => response(res, 200, {msg: 'user deleted', user: result}))
		.catch((error) => response(res, 400, error));
}
