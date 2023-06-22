"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = __importDefault(require("../models/index"));
const server_1 = require("../server");
const User_1 = __importDefault(require("../models/User"));
const Blog_1 = __importDefault(require("../models/Blog"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
beforeAll(index_1.default.disconnect); // Golden line !!
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const testDBUrl = "mongodb://127.0.0.1:27017/testingBE";
    yield index_1.default.connect(testDBUrl);
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    if (index_1.default.connection.readyState !== 0) {
        yield User_1.default.deleteMany({});
        yield Blog_1.default.deleteMany({});
        yield index_1.default.connection.close();
    }
}));
const request = (0, supertest_1.default)(server_1.app);
describe("POST /register", () => {
    it("should save a new user to DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        };
        const response = yield request.post("/register").send(userData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.username).toBe(userData.username);
        expect(response.body.email).toBe(userData.email);
        // Password should be hashed
        expect(response.body.password).not.toBe(userData.password);
    }));
});
describe("POST /login", () => {
    it("should log in a user with correct credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        };
        const responseBeforeLogin = yield request.post("/register").send(userData);
        const loginData = {
            username: "testuser",
            password: "password123",
        };
        const response = yield request.post("/login").send(loginData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("msg", "logged in");
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("username", loginData.username);
    }));
    it("should return an error for incorrect credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginData = {
            username: "testuser",
            password: "wrongpassword",
        };
        const response = yield request.post("/login").send(loginData);
        expect(response.status).toBe(400);
        expect(response.body).toBe("Wrong credentials!");
    }));
});
describe("GET /users", () => {
    it("should return all users with status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        // Create test users
        const testUsers = [
            { username: "user1", email: "user1@example.com", password: "password1" },
            { username: "user2", email: "user2@example.com", password: "password2" },
        ];
        yield User_1.default.create(testUsers);
        const response = yield request.get("/users");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2); // Assuming there are two test users
        expect(response.body[0].username).toBe("user1");
        expect(response.body[1].username).toBe("user2");
    }));
    it("should handle errors and return status 400", () => __awaiter(void 0, void 0, void 0, function* () {
        // Disconnect from the database to simulate an error
        yield index_1.default.disconnect();
        const response = yield request.get("/users");
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    }));
});
describe("GET /profile/:id", () => {
    it("should return the user profile for a valid user ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield User_1.default.create({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });
        const response = yield request.get(`/profile/${newUser._id}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(String(newUser._id));
        expect(response.body.username).toBe(newUser.username);
        expect(response.body.email).toBe(newUser.email);
    }));
    it("should return an error for an invalid user ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidUserId = "invalidid";
        const response = yield request.get(`/profile/${invalidUserId}`);
        expect(response.status).toBe(500);
    }));
});
describe("GET /auth", () => {
    it("should return the authenticated user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield User_1.default.create({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });
        const secret = process.env.SECRET || "defaultSecretKey";
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, secret);
        const response = yield request.get("/auth").set("token", token);
        expect(response.status).toBe(200);
        expect(response.body.username).toBe(newUser.username);
        expect(response.body.email).toBe(newUser.email);
    }));
});
describe("DELETE /profile/:id", () => {
    it("should delete the user profile for a valid user ID", () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a test user
        const newUser = yield User_1.default.create({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });
        const secret = process.env.SECRET || "defaultSecretKey";
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, secret);
        // delete request
        const response = yield request
            .delete(`/profile/${newUser._id}`)
            .set("token", token);
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("user deleted");
        expect(response.body.user).toHaveProperty("_id", String(newUser._id));
        expect(response.body.user).toHaveProperty("username", newUser.username);
        expect(response.body.user).toHaveProperty("email", newUser.email);
        // Check if the user is deleted from the database
        const deletedUser = yield User_1.default.findById(newUser._id);
        expect(deletedUser).toBeNull();
    }));
    it("should return error when user profile doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidUserId = "invalidUserId";
        const secret = process.env.SECRET || "defaultSecretKey";
        const token = jsonwebtoken_1.default.sign({ id: invalidUserId }, secret);
        // Making delete request
        const response = yield request
            .delete(`/profile/${invalidUserId}`)
            .set("token", token);
        // Check the response
        expect(response.status).toBe(401);
        expect(response).toThrowError;
    }));
});
describe("GET /blog => search by queri or params", () => { });
it("should get all blogs from a specific user", () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield User_1.default.create({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
    });
    const testBlog = yield Blog_1.default.create({
        title: "Test Blog",
        content: "This is a test blog.",
        author: newUser._id,
        category: "test",
        image: "randomImage",
    });
    const response = yield request.get("/blog").query({ user: "testuser" });
    console.log("In User Test", response.body);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
}));
it("should get all blogs in a specific category", () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield User_1.default.create({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
    });
    const testBlog = yield Blog_1.default.create({
        title: "Test Blog",
        content: "This is a test blog.",
        author: newUser._id,
        category: "test",
        image: "randomImage",
    });
    const response = yield request.get("/blog").query({ cat: "test" });
    console.log("In Cat test", response.body);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
}));
