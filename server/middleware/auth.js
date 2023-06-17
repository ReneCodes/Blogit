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
exports.getAuth = void 0;
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const User_1 = __importDefault(require("../models/User"));
const getAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(401).json({ error: "unauthorised" });
        }
        const verifiedToken = jwt.verify(token, process.env.SECRET);
        const auth = yield User_1.default.findById(verifiedToken.id);
        req.userId = verifiedToken.id;
        req.auth = auth;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "unauthorised user" });
    }
});
exports.getAuth = getAuth;
