const Blog = require('../models/Blog.js');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const SECRET = 'thissecret';
const response = (res, status, result) => {
  res.status(status).json(result);
};
async function BlogGetRouter(req, res) {
  const username = req.query.user;
  console.log(username);
  try {
    let blogs;
    if (username) {
      blogs = await User.findOne({ username: username })
        .then((user) => Blog.find({ author: user._id }).populate('author'))
        .catch((err) => console.log(err));
    } else {
      blogs = await Blog.find().populate('author', '-password');
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function BlogPostRouter(req, res) {
  try {
    const { token } = req.cookies;
    jwt.verify(token, SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { title, content, image } = req.body;
      const postDoc = await Blog.create({
        title,
        content,
        image,
        author: info.id,
      });
      res.json(postDoc);
    });
  } catch (error) {
    response(res, 400, { error: error });
  }
}
async function BlogDeleteRouter(req, res) {
  try {
    const blog = await Blog.findOneAndDelete({ user: req.userId, _id: req.body.id });
    if (!blog) {
      response(res, 404, { error: 'no blog' });
    }
    response(res, 200, { msg: 'blog deleted' });
  } catch (error) {
    response(res, 400, { error: error });
  }
}
async function BlogUpdateRouter(req, res) {
  const { title, image, content, id } = req.body;
  await Blog.findOneAndUpdate(
    { user: req.userId, _id: id },
    {
      title,
      content,
      image,
    }
  )
    .then((result) => response(res, 200, { msg: 'blog updated', blog: result }))
    .catch((err) => response(res, 400, err));
}
async function BlogGetByIdRouter(req, res) {
  try {
    const post = await Blog.findById(req.params.id).populate('author', '-password');
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}
module.exports = { BlogGetRouter, BlogPostRouter, BlogDeleteRouter, BlogUpdateRouter, BlogGetByIdRouter };
