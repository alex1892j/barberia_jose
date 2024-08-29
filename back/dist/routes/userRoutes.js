"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
// Ruta para obtener todos los usuarios
router.get('/', userController_1.getAllUsers);
// Ruta para obtener un usuario por su ID
router.get('/:id', userController_1.getUserById);
// Ruta para crear un nuevo usuario
router.post('/', userController_1.createUser);
// Ruta para iniciar sesión y verificar credenciales
router.post('/login', userController_1.loginUser);
exports.default = router;
