// src/index.ts
import express from 'express';
import cors from 'cors';
import router from './routes';      

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', router);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

export default app;
