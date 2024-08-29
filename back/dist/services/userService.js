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
exports.verifyUserCredentials = exports.createNewUser = exports.getUser = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Credential_1 = require("../entitis/Credential");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appDataSource_1 = __importDefault(require("../config/appDataSource"));
const User_1 = require("../entitis/User");
// Obtener todos los usuarios
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = appDataSource_1.default.getRepository(User_1.User);
    return userRepository.find();
});
exports.getUsers = getUsers;
// Obtener un usuario por ID
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = appDataSource_1.default.getRepository(User_1.User);
    return userRepository.findOne({ where: { id } });
});
exports.getUser = getUser;
// Crear un nuevo usuario
const createNewUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userRepository = appDataSource_1.default.getRepository(User_1.User);
    // Hashear la contraseña antes de guardar
    if ((_a = userData.credentials) === null || _a === void 0 ? void 0 : _a.password) {
        const salt = yield bcryptjs_1.default.genSalt(10);
        userData.credentials.password = yield bcryptjs_1.default.hash(userData.credentials.password, salt);
    }
    const newUser = userRepository.create(userData);
    return userRepository.save(newUser);
});
exports.createNewUser = createNewUser;
// Verificar credenciales del usuario
const verifyUserCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialsRepository = appDataSource_1.default.getRepository(Credential_1.Credentials);
    const credentials = yield credentialsRepository.findOne({ where: { username }, relations: ['user'] });
    if (credentials && credentials.password) {
        // Verificar la contraseña
        const isMatch = yield bcryptjs_1.default.compare(password, credentials.password);
        if (isMatch) {
            // Generar token JWT si las credenciales son válidas
            const token = jsonwebtoken_1.default.sign({ userId: credentials.user.id }, process.env.JWT_SECRET || 'secret', {
                expiresIn: '1h',
            });
            return token;
        }
    }
    return null;
});
exports.verifyUserCredentials = verifyUserCredentials;
