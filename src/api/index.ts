import express from 'express';
import serverless from 'serverless-http';
import userRoutes from './users';

const app = express();
app.use(express.json());

app.use('/', userRoutes);

export default serverless(app);
