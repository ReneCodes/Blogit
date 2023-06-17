"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();
if (process.env.MONGO_URL) {
    mongoose_1.default
        .connect(process.env.MONGO_URL, {})
        .then(function () {
        console.log("connected to db");
    })
        .catch(function (err) { return console.log(err); });
}
exports.default = mongoose_1.default;
