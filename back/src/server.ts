import express  from "express";
import morgan from "morgan";
import cors from "cors";
import indexRouters from "./routes/indexRouters";

const server = express();

server.use(express.json()); 
server.use(morgan("dev"));  
server.use(cors());  
server.use(indexRouters)

export default server;