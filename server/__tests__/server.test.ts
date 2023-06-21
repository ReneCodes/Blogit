import supertest from "supertest";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "../models/index";
import { app } from "../server";
import User from "../models/User";
import jwt from "jsonwebtoken";

beforeAll(mongoose.disconnect); // Golden line !!

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

describe("POST /register", () => {
  it("should save a new user to DB", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    const response = await request.post("/register").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.username).toBe(userData.username);
    expect(response.body.email).toBe(userData.email);
    // Password should be hashed
    expect(response.body.password).not.toBe(userData.password);
  });
});
describe("POST /login", () => {
  it("should log in a user with correct credentials", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    const responseBeforeLogin = await request.post("/register").send(userData);
    const loginData = {
      username: "testuser",
      password: "password123",
    };

    const response = await request.post("/login").send(loginData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("msg", "logged in");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("username", loginData.username);
  });

  it("should return an error for incorrect credentials", async () => {
    const loginData = {
      username: "testuser",
      password: "wrongpassword",
    };

    const response = await request.post("/login").send(loginData);

    expect(response.status).toBe(400);
    expect(response.body).toBe("Wrong credentials!");
  });
});
describe("GET /users", () => {
  it("should return all users with status 200", async () => {
    // Create test users
    const testUsers = [
      { username: "user1", email: "user1@example.com", password: "password1" },
      { username: "user2", email: "user2@example.com", password: "password2" },
    ];
    await User.create(testUsers);

    const response = await request.get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // Assuming there are two test users
    expect(response.body[0].username).toBe("user1");
    expect(response.body[1].username).toBe("user2");
  });

  it("should handle errors and return status 400", async () => {
    // Disconnect from the database to simulate an error
    await mongoose.disconnect();

    const response = await request.get("/users");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
describe("GET /profile/:id", () => {
  it("should return the user profile for a valid user ID", async () => {
    const newUser = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    const response = await request.get(`/profile/${newUser._id}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(String(newUser._id));
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.email).toBe(newUser.email);
  });

  it("should return an error for an invalid user ID", async () => {
    const invalidUserId = "invalidid";

    const response = await request.get(`/profile/${invalidUserId}`);

    expect(response.status).toBe(500);
  });
});

describe("GET /auth", () => {
  it("should return the authenticated user", async () => {
    const newUser = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    const secret = process.env.SECRET || "defaultSecretKey";
    const token = jwt.sign({ id: newUser._id }, secret);

    const response = await request.get("/auth").set("token", token);

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.email).toBe(newUser.email);
  });
});
