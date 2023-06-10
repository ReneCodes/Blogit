const mongoose = require('./index');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
