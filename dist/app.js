"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("./database/config");
class App {
    constructor() {
        this.porta = Number(process.env.PORT) || 5000;
        dotenv_1.default.config();
        this.expressApp = (0, express_1.default)();
        this.database();
        this.middlewares();
        this.rotas();
        this.listen();
    }
    listen() {
        this.expressApp.listen(this.porta, () => {
            console.log(`🚀 Servidor rodando na porta: ${this.porta}`);
        });
    }
    database() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.sequelize.authenticate();
                console.log('📦 Conectado ao banco PostgreSQL com Sequelize');
                yield config_1.sequelize.sync({ alter: true });
            }
            catch (error) {
                console.error('❌ Erro ao conectar no banco:', error);
            }
        });
    }
    middlewares() {
        this.expressApp.use((0, cors_1.default)());
        this.expressApp.use((0, helmet_1.default)());
        this.expressApp.use((0, morgan_1.default)('dev'));
        this.expressApp.use((0, cookie_parser_1.default)());
        this.expressApp.use((0, compression_1.default)());
        this.expressApp.use(body_parser_1.default.json());
        this.expressApp.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    rotas() {
        this.expressApp.use('/', routes_1.default);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map