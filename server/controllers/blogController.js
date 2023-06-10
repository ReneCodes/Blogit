const Blog = require('../models/Blog.js');

const response = (res, status, result) => {
  res.status(status).json(result);
};
async function BlogGetRouter(req, res) {
  await Blog.find()
    .then((result) => {
      response(res, 200, result);
    })

    .catch((err) => {
      response(res, 400, { err: err });
    });
}

async function BlogPostRouter(req, res) {
  try {
    const { title, content, image } = req.body;
    if (title && content) {
      const blog = new Blog({
        title,
        content,
        image,
        user: req.userId,
      });
      await blog.save();

      response(res, 200, { msg: 'blog created', blog: blog });
    }
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

module.exports = { BlogGetRouter, BlogPostRouter, BlogDeleteRouter };
