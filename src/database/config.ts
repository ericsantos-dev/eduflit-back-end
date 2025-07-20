import { DataSource } from 'typeorm';
import { User } from '../models/User';
import dotenv from 'dotenv';

  dotenv.config();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,                
  port: parseInt(process.env.PG_PORT || '5432'),
  username: process.env.PG_USUARIO,
  password: process.env.PG_SENHA,
  database: process.env.PG_BANCO,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
});

export const initializeDatabase = async () => {
  await AppDataSource.initialize()
    .then(() => console.log("DATABASE INITIALIZED"))
    .catch((error) => console.log("ERROR TO INITIALIZE DATABASE:", error));
};
export default AppDataSource;
