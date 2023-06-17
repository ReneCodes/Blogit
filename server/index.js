"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const router = require("./router");
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:3000" }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "/images")));
app.use(router);
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
