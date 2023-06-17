"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// mongoose
//   // @ts-ignore
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("connected to db");
//   })
//   .catch((err) => console.log(err));
// @ts-ignore
mongoose_1.default.connect(process.env.MONGO_URL, console.log("Connected to DB"));
exports.default = mongoose_1.default;
