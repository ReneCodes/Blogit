import mongoose, { Schema, Document } from "mongoose";
import db from "./index";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  image?: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const User = db.model<IUser>("User", UserSchema);

export default User;
