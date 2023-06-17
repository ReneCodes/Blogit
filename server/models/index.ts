import mongoose, { ConnectOptions } from "mongoose";
const dotenv = require("dotenv");
dotenv.config();

if (process.env.MONGO_URL) {
  mongoose
    .connect(process.env.MONGO_URL, {} as ConnectOptions)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));
}
export default mongoose;
