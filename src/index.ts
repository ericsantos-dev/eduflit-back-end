// src/index.ts
import express from 'express';
import cors from 'cors';
import router from './routes';      

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use('/', router);

export default app;
