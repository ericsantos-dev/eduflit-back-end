// src/index.ts
import express from 'express';
import cors from 'cors';
import router from './routes';      

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', router);
import { Router, Request, Response, NextFunction } from 'express';
import UserService from './services/UserService';


// Get all users
app.get('/users', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.fetchAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});


export default app;
