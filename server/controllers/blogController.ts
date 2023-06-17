const dotenv = require("dotenv").config();
import { Request, Response } from "express";
import Blog, { IBlog } from "../models/Blog";
import User, { IUser } from "../models/User";
const jwt = require("jsonwebtoken");

interface AuthenticatedRequest extends Request {
  userId: string;
}

const response = (res: Response, status: number, result: any) => {
  res.status(status).json(result);
};

async function blogGetRouter(req: Request, res: Response) {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let blogs;
    if (username) {
      blogs = await User.findOne({ username: username })
        .then((user: IUser | null) =>
          Blog.find({ author: user?._id })
            .populate("author")
            .sort({ createdAt: -1 })
        )

        .catch((err) => console.log(err));
    } else if (catName) {
      blogs = await Blog.find({ category: catName })
        .populate("author", "-password")
        .sort({ createdAt: -1 })
        .limit(20);
    } else {
      blogs = await Blog.find()
        .populate("author", "-password")
        .sort({ createdAt: -1 })
        .limit(20);
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function blogPostRouter(req: Request, res: Response) {
  const { title, content, image, category } = req.body;
  try {
    const postDoc: IBlog = await Blog.create({
      title,
      content,
      category,
      image,
      author: (req as AuthenticatedRequest).userId,
    });
    res.status(200).json(postDoc);
  } catch (error) {}
}
async function blogDeleteRouter(req: Request, res: Response) {
  try {
    const blog = await Blog.findOneAndDelete({
      author: (req as AuthenticatedRequest).userId,
      _id: req.params.id,
    });
    if (!blog) {
      response(res, 404, { error: "no blog" });
    }
    response(res, 200, { msg: "blog deleted" });
  } catch (error) {
    response(res, 400, { error: error });
  }
}
async function blogUpdateRouter(req: Request, res: Response) {
  const { title, image, content } = req.body;
  await Blog.findOneAndUpdate(
    { author: (req as AuthenticatedRequest).userId, _id: req.params.id },
    {
      title,
      content,
      image,
    }
  )
    .then((result) => response(res, 200, { msg: "blog updated", blog: result }))
    .catch((error) => response(res, 400, error));
}
async function blogGetByIdRouter(req: Request, res: Response): Promise<void> {
  try {
    const post = await Blog.findById(req.params.id).populate(
      "author",
      "-password"
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export {
  blogGetRouter,
  blogPostRouter,
  blogDeleteRouter,
  blogUpdateRouter,
  blogGetByIdRouter,
};
