// src/server.ts
import app from './index';           
import AppDataSource from './database/config';  
import http from 'http'
const PORT = process.env.PORT || 3001;

const server = http.createServer(app)

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database OK');

    server.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar o Data Source:', error);
  }
};

startServer();
