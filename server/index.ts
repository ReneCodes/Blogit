import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
const app: Application = express();
const port = process.env.PORT;

const router = require("./router");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
