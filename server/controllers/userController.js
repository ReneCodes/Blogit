const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'thissecret';
const response = (res, status, result) => {
  res.status(status).json(result);
};
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
    const userDoc = await User.findOne({ username });
    !userDoc && res.status(400).json('Wrong credentials!');

    const passOk = bcrypt.compareSync(password, userDoc.password);
    !passOk && res.status(400).json('Wrong credentials!');

    const token = jwt.sign({ username, id: userDoc._id }, SECRET);
    res.status(201).json({ msg: 'logged in', token: token, username });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function UserProfileRouter(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function userProfileUpdateRouter(req, res) {
  // const { username, image, password, email } = req.body;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  if (!req.body.password) {
    req.body.password = req.auth.password;
  }
  if (!req.body.username) {
    req.body.username = req.auth.username;
  }
  if (!req.body.email) {
    req.body.email = req.auth.email;
  }

  await User.findByIdAndUpdate(
    { author: req.userId, _id: req.params.id },
    {
      $set: req.body,
    }
  )
    .then((result) => response(res, 200, { msg: 'user updated', user: result }))
    .catch((err) => response(res, 400, err));
}
async function userDeleteRouter(req, res) {
  // const { username, image, password, email } = req.body;

  await User.findByIdAndDelete({ author: req.userId, _id: req.params.id })
    .then((result) => response(res, 200, { msg: 'user deleted', user: result }))
    .catch((err) => response(res, 400, err));
}

async function UserAuthRouter(req, res) {
  res.status(200).json(req.auth);
}
module.exports = { UserPostRouter, UserGetRouter, UserLoginRouter, UserProfileRouter, userProfileUpdateRouter, UserAuthRouter, userDeleteRouter };
