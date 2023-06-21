import supertest from "supertest";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "../models/index";
import { app } from "../server";
import User from "../models/User";
import jwt from "jsonwebtoken";

beforeAll(mongoose.disconnect);

beforeEach(async () => {
  const testDBUrl = "mongodb://127.0.0.1:27017/testingBE";
  await mongoose.connect(testDBUrl);
});
afterEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    await User.deleteMany({});
    await mongoose.connection.close();
  }
});

const request = supertest(app);

test("Adding 2 and 2 should be 4", () => {
  expect(2 + 2).toBe(4);
});
