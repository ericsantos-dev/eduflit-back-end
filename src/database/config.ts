import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '5432'),
  username: process.env.PG_USUARIO,
  password: process.env.PG_SENHA,
  database: process.env.PG_BANCO,
  dialect: 'postgres',  // <--- aqui
  logging: console.log,
});
