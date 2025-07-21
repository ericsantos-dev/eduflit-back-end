"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("./index"));
const config_1 = require("./database/config");
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const server = http_1.default.createServer(index_1.default);
(async () => {
    try {
        await config_1.sequelize.authenticate();
        console.log('📦 Banco de dados conectado com sucesso');
        await config_1.sequelize.sync();
        console.log('📦 Modelos sincronizados com o banco de dados');
        server.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Erro ao inicializar o banco de dados:', error);
    }
})();
//# sourceMappingURL=server.js.map