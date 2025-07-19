// src/server.ts
import 'reflect-metadata';
import app from './index';           // o express app
import AppDataSource from './database/config';  // seu data-source
import dotenv from 'dotenv';

// carrega .env apenas localmente
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database OK');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar o Data Source:', error);
  }
};

startServer();
