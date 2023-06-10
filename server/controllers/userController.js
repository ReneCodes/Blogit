const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).json({ error: 'user not found' });
    }
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const token = jwt.sign({ _id: user._id }, 'thissecret');
    // res.status(200).send({ token: token });
    res.cookie('token', token).json('ok');
  } catch (e) {
    res.status(400).json({ e });
  }
}
module.exports = { UserPostRouter, UserGetRouter, UserLoginRouter };
