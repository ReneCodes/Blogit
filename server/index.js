"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var path = require("path");
var app = express();
var port = process.env.PORT;
var router = require("./router");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(router);
app.listen(port, function () {
    console.log("app listening on port ".concat(port));
});
