// src/index.ts
import express from 'express';
import cors from 'cors';
import router from './routes';      // ajuste se sua pasta for diferente

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', router);

export default app;
