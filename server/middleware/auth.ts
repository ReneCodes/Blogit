const dotenv = require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import User, { IUser } from "../models/User";

interface AuthenticatedRequest extends Request {
  userId: string;
  auth?: any;
}

const getAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(401).json({ error: "unauthorised" });
    }
    const verifiedToken = jwt.verify(token, process.env.SECRET);
    const auth = await User.findById(verifiedToken.id);
    (req as AuthenticatedRequest).userId = verifiedToken.id;

    (req as AuthenticatedRequest).auth = auth;

    next();
  } catch (error) {
    res.status(401).json({ error: "unauthorised user" });
  }
};
export { getAuth };
