import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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
mongoose.connect(process.env.MONGO_URL, console.log("Connected to DB"));

export default mongoose;
