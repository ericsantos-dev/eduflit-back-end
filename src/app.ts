// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import router from './routes';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { sequelize } from './database/config';

export class App {
	private expressApp: Application;
	private porta: number = Number(process.env.PORT) || 5000;

	constructor() {
		dotenv.config();
		this.expressApp = express();
		this.database();
		this.middlewares();
		this.rotas();
		this.listen();
	}

	private listen(): void {
		this.expressApp.listen(this.porta, () => {
			console.log(`🚀 Servidor rodando na porta: ${this.porta}`);
		});
	}

	private async database(): Promise<void> {
		try {
			await sequelize.authenticate();
			console.log('📦 Conectado ao banco PostgreSQL com Sequelize');
			await sequelize.sync({ alter: true }); // ou force: true se necessário
		} catch (error) {
			console.error('❌ Erro ao conectar no banco:', error);
		}
	}

	private middlewares(): void {
		this.expressApp.use(cors());
		this.expressApp.use(helmet());
		this.expressApp.use(morgan('dev'));
		this.expressApp.use(cookieParser());
		this.expressApp.use(compression());
		this.expressApp.use(bodyParser.json());
		this.expressApp.use(bodyParser.urlencoded({ extended: true }));
	}

	private rotas(): void {
        this.expressApp.use('/', router);
	}
}
