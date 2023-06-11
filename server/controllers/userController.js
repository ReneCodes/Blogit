const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'thissecret';

async function UserGetRouter(req, res) {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ e });
  }
}

async function UserPostRouter(req, res) {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) return res.status(409).send({ error: '409', message: 'User already exists' });
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
    res.status(400).send({ error, message: 'Could not create user' });
  }
}

async function UserLoginRouter(req, res) {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, SECRET, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
}
async function UserProfileRouter(req, res) {
  if (!req.cookies) return;
  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
}

async function UserLogoutRouter(req, res) {
  res.cookie('token', '').json('ok');
}

module.exports = { UserPostRouter, UserGetRouter, UserLoginRouter, UserProfileRouter, UserLogoutRouter };
