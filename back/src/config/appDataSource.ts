import "dotenv/config"
import { DataSource } from "typeorm"
import { User } from "../entitis/User";
import { Appointment } from "../entitis/Appointment";
import { Credentials } from "../entitis/Credential";

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Appointment, Credentials],
})

export default AppDataSource;