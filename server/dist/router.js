"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const userController_js_1 = require("./controllers/userController.js");
const blogController_1 = require("./controllers/blogController");
const auth_1 = require("./middleware/auth");
const router = (0, express_1.Router)();
router.post("/register", userController_js_1.userPostRouter);
router.get("/users", userController_js_1.userGetRouter);
router.post("/login", userController_js_1.userLoginRouter);
router.get("/profile/:id", userController_js_1.userProfileRouter);
router.put("/profile/:id", auth_1.getAuth, userController_js_1.userProfileUpdateRouter);
router.get("/auth", auth_1.getAuth, userController_js_1.userAuthRouter);
router.delete("/profile/:id", auth_1.getAuth, userController_js_1.userDeleteRouter);
router.get("/blog", blogController_1.blogGetRouter);
router.get("/blog/:id", blogController_1.blogGetByIdRouter);
router.post("/create", auth_1.getAuth, blogController_1.blogPostRouter);
router.delete("/blog/:id", auth_1.getAuth, blogController_1.blogDeleteRouter);
router.put("/edit/:id", auth_1.getAuth, blogController_1.blogUpdateRouter);
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});
module.exports = router;
