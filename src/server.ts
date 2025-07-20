// src/server.ts
import dotenv from 'dotenv';
import http from 'http';
import app from './index'; // Express app
import AppDataSource from './database/config'; // Data source (ex: TypeORM)

dotenv.config();

const PORT = process.env.PORT || 3001;

// Cria o servidor HTTP a partir do Express
const server = http.createServer(app);

(async () => {
  try {
    await AppDataSource.initialize();
    console.log('📦 Banco de dados conectado com sucesso');

    server.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar o banco de dados:', error);
  }
})();
