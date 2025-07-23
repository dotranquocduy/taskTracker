import "reflect-metadata";
import { DataSource } from 'typeorm';
import { User } from '../models/user';
// import { Task } from '../models/task';


// config database
// Khởi tạo database connection

export const AppDataSource = new DataSource({
type : "postgres",
host: process.env.DB_HOST,
port: Number(process.env.DB_PORT),
username: process.env.DB_USER,
database: process.env.DB_NAME,
password: process.env.DB_PASSWORD,
entities: [User],

//  synchronize: true, // Chỉ dùng ở dev, không nên ở prod

});
