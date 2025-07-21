import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  host: "aws-0-us-east-2.pooler.supabase.com",
  port: parseInt(process.env.PG_PORT || '5432'),
  username: "postgres.rvjqqeojodwjsqeeodsk",
  password: "eric550spfc",
  database: "postgres",
  dialect: 'postgres',  // <--- aqui
  logging: console.log,
});
