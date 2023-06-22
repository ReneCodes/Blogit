import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const router = require("./router");

const app: Application = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(router);

export { app };
