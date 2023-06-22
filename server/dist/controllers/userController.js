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
exports.userDeleteRouter = exports.userAuthRouter = exports.userProfileUpdateRouter = exports.userProfileRouter = exports.userLoginRouter = exports.userGetRouter = exports.userPostRouter = void 0;
const dotenv = require("dotenv").config();
const User_1 = __importDefault(require("../models/User"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const response = (res, status, result) => {
    res.status(status).json(result);
};
function userGetRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.find();
            res.status(200).json(user);
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    });
}
exports.userGetRouter = userGetRouter;
function userPostRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (user)
            return res
                .status(409)
                .send({ error: "409", message: "User already exists" });
        try {
            if (password === "")
                throw new Error();
            const hash = yield bcrypt.hash(password, 10);
            const newUser = new User_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
            const user = yield newUser.save();
            res.status(201).send(user);
        }
        catch (error) {
            res.status(400).send({ error, message: "Could not create user" });
        }
    });
}
exports.userPostRouter = userPostRouter;
function userLoginRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const userDoc = yield User_1.default.findOne({ username });
            if (!userDoc) {
                return res.status(400).json("Wrong credentials!");
            }
            const passOk = yield bcrypt.compare(password, userDoc.password);
            if (!passOk) {
                return res.status(400).json("Wrong credentials!");
            }
            const token = jwt.sign({ username, id: userDoc._id }, process.env.SECRET);
            res.status(201).json({ msg: "logged in", token: token, username });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    });
}
exports.userLoginRouter = userLoginRouter;
function userProfileRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findById(req.params.id);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    });
}
exports.userProfileRouter = userProfileRouter;
function userProfileUpdateRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const { username, image, password, email } = req.body;
        if (req.body.password) {
            const salt = yield bcrypt.genSalt(10);
            req.body.password = yield bcrypt.hash(req.body.password, salt);
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
        yield User_1.default.findByIdAndUpdate({ author: req.userId, _id: req.params.id }, {
            $set: req.body,
        })
            .then((result) => response(res, 200, { msg: "user updated", user: result }))
            .catch((error) => response(res, 400, error));
    });
}
exports.userProfileUpdateRouter = userProfileUpdateRouter;
function userDeleteRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const { username, image, password, email } = req.body;
        yield User_1.default.findByIdAndDelete({
            author: req.userId,
            _id: req.params.id,
        })
            .then((result) => response(res, 200, { msg: "user deleted", user: result }))
            .catch((error) => response(res, 400, error));
    });
}
exports.userDeleteRouter = userDeleteRouter;
function userAuthRouter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json(req.auth);
    });
}
exports.userAuthRouter = userAuthRouter;
