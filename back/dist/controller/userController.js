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
exports.loginUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const userService_1 = require("../services/userService");
// Controlador para obtener todos los usuarios
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});
exports.getAllUsers = getAllUsers;
// Controlador para obtener un usuario por su ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const userId = parseInt(id, 10); // Convertir id a número
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'ID de usuario no válido' });
        }
        const user = yield (0, userService_1.getUser)(userId);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
});
exports.getUserById = getUserById;
// Controlador para crear un nuevo usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, userService_1.createNewUser)(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear usuario' });
    }
});
exports.createUser = createUser;
// Controlador para iniciar sesión y verificar credenciales
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const token = yield (0, userService_1.verifyUserCredentials)(username, password);
        if (token) {
            res.status(200).json({ token });
        }
        else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});
exports.loginUser = loginUser;
