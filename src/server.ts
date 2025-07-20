// src/server.ts
import dotenv from 'dotenv';
import http from 'http';
import app from './index'; // Express app
import { sequelize } from './database/config'; // Sequelize instance

dotenv.config();

const PORT = process.env.PORT || 3001;

// Cria o servidor HTTP a partir do Express
const server = http.createServer(app);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('📦 Banco de dados conectado com sucesso');

    await sequelize.sync(); // Sincroniza os modelos com o banco
    console.log('📦 Modelos sincronizados com o banco de dados');

    server.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar o banco de dados:', error);
  }
})();
