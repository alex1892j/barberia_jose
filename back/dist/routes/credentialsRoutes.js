"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const credentialsController_1 = require("../controller/credentialsController");
const router = (0, express_1.Router)();
// Ruta para crear nuevas credenciales
router.post('/credentials', credentialsController_1.createCredentialsController);
// Ruta para iniciar sesión y verificar credenciales
router.post('/login', userController_1.loginUser);
exports.default = router;
