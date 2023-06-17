"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogGetByIdRouter = exports.blogUpdateRouter = exports.blogDeleteRouter = exports.blogPostRouter = exports.blogGetRouter = void 0;
const dotenv = require("dotenv").config();
const Blog_1 = __importDefault(require("../models/Blog"));
const User_1 = __importDefault(require("../models/User"));
const jwt = require("jsonwebtoken");
const response = (res, status, result) => {
    res.status(status).json(result);
};
function blogGetRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.query.user;
        const catName = req.query.cat;
        try {
            let blogs;
            if (username) {
                blogs = yield User_1.default.findOne({ username: username })
                    .then((user) => Blog_1.default.find({ author: user === null || user === void 0 ? void 0 : user._id })
                    .populate("author")
                    .sort({ createdAt: -1 }))
                    .catch((err) => console.log(err));
            }
            else if (catName) {
                blogs = yield Blog_1.default.find({ category: catName })
                    .populate("author", "-password")
                    .sort({ createdAt: -1 })
                    .limit(20);
            }
            else {
                blogs = yield Blog_1.default.find()
                    .populate("author", "-password")
                    .sort({ createdAt: -1 })
                    .limit(20);
            }
            res.status(200).json(blogs);
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
}
exports.blogGetRouter = blogGetRouter;
function blogPostRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, content, image, category } = req.body;
        try {
            const postDoc = yield Blog_1.default.create({
                title,
                content,
                category,
                image,
                author: req.userId,
            });
            res.status(200).json(postDoc);
        }
        catch (error) { }
    });
}
exports.blogPostRouter = blogPostRouter;
function blogDeleteRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blog = yield Blog_1.default.findOneAndDelete({
                author: req.userId,
                _id: req.params.id,
            });
            if (!blog) {
                response(res, 404, { error: "no blog" });
            }
            response(res, 200, { msg: "blog deleted" });
        }
        catch (error) {
            response(res, 400, { error: error });
        }
    });
}
exports.blogDeleteRouter = blogDeleteRouter;
function blogUpdateRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, image, content } = req.body;
        yield Blog_1.default.findOneAndUpdate({ author: req.userId, _id: req.params.id }, {
            title,
            content,
            image,
        })
            .then((result) => response(res, 200, { msg: "blog updated", blog: result }))
            .catch((error) => response(res, 400, error));
    });
}
exports.blogUpdateRouter = blogUpdateRouter;
function blogGetByIdRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield Blog_1.default.findById(req.params.id).populate("author", "-password");
            res.status(200).json(post);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.blogGetByIdRouter = blogGetByIdRouter;
