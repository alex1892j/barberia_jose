"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = __importDefault(require("./server"));
const appDataSource_1 = __importDefault(require("./config/appDataSource"));
const env_1 = require("./config/env");
require("dotenv").config();
appDataSource_1.default.initialize().then(res => {
    console.log("conexion a la base de datos realizada con exito");
    server_1.default.listen(env_1.PORT, () => {
        console.log(`servidor escuchando en el puerto ${env_1.PORT}`);
    });
});
