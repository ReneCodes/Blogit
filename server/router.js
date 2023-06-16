"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer = require("multer");
var userController_js_1 = require("./controllers/userController.js");
var blogController_js_1 = require("./controllers/blogController.js");
var auth_1 = require("./middleware/auth");
var router = (0, express_1.Router)();
router.post("/register", userController_js_1.userPostRouter);
router.get("/users", userController_js_1.userGetRouter);
router.post("/login", userController_js_1.userLoginRouter);
router.get("/profile/:id", userController_js_1.userProfileRouter);
router.put("/profile/:id", auth_1.default, userController_js_1.userProfileUpdateRouter);
router.get("/auth", auth_1.default, userController_js_1.userAuthRouter);
router.delete("/profile/:id", auth_1.default, userController_js_1.userDeleteRouter);
router.get("/blog", blogController_js_1.blogGetRouter);
router.get("/blog/:id", blogController_js_1.blogGetByIdRouter);
router.post("/create", auth_1.default, blogController_js_1.blogPostRouter);
router.delete("/blog/:id", auth_1.default, blogController_js_1.blogDeleteRouter);
router.put("/edit/:id", auth_1.default, blogController_js_1.blogUpdateRouter);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Images");
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name);
    },
});
var upload = multer({ storage: storage });
router.post("/upload", upload.single("file"), function (req, res) {
    res.status(200).json("File has been uploaded");
});
module.exports = router;
