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
beforeAll(index_1.default.disconnect);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const testDBUrl = "mongodb://127.0.0.1:27017/testingBE";
    yield index_1.default.connect(testDBUrl);
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    if (index_1.default.connection.readyState !== 0) {
        yield User_1.default.deleteMany({});
        yield index_1.default.connection.close();
    }
}));
const request = (0, supertest_1.default)(server_1.app);
test("Adding 2 and 2 should be 4", () => {
    expect(2 + 2).toBe(4);
});
