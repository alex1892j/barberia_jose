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
exports.verifyCredentialsServices = exports.createCredentialsServices = void 0;
const appDataSource_1 = __importDefault(require("../config/appDataSource"));
const Credential_1 = require("../entitis/Credential");
const User_1 = require("../entitis/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createCredentialsServices = (userId, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialsRepository = appDataSource_1.default.getRepository(Credential_1.Credentials);
    const userRepository = appDataSource_1.default.getRepository(User_1.User);
    const user = yield userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newCredentials = credentialsRepository.create({ username, password: hashedPassword, user });
    return credentialsRepository.save(newCredentials);
});
exports.createCredentialsServices = createCredentialsServices;
const verifyCredentialsServices = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialsRepository = appDataSource_1.default.getRepository(Credential_1.Credentials);
    const credentials = yield credentialsRepository.findOne({ where: { username }, relations: ['user'] });
    if (!credentials) {
        return null;
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, credentials.password);
    if (isPasswordValid) {
        const token = jsonwebtoken_1.default.sign({ userId: credentials.user.id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1h',
        });
        return token;
    }
    return null;
});
exports.verifyCredentialsServices = verifyCredentialsServices;
