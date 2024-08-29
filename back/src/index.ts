import "reflect-metadata"
import server from "./server"
import AppDataSource from "./config/appDataSource";
import { PORT } from "./config/env";

require("dotenv").config()

AppDataSource.initialize().then( res =>{
    
    console.log("conexion a la base de datos realizada con exito");
    server.listen(PORT, () =>{
        console.log(`servidor escuchando en el puerto ${PORT}`)
    })
})
