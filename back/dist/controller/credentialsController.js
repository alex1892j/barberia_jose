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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createCredentialsController = void 0;
const credentialsServices_1 = require("../services/credentialsServices");
const userService_1 = require("../services/userService");
// Controlador para crear nuevas credenciales
const createCredentialsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, userId } = req.body;
        const credentials = yield (0, credentialsServices_1.createCredentialsServices)({ userId, username, password });
        res.status(201).json(credentials);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.createCredentialsController = createCredentialsController;
// Controlador para iniciar sesión y verificar credenciales
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const token = yield (0, userService_1.verifyUserCredentials)(username, password);
        if (token) {
            res.status(200).json({ token });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.loginUser = loginUser;
