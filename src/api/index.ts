import express from 'express';
import serverless from 'serverless-http';
import users from './users';

const app = express();
app.use(express.json());

app.use('/', users);

export default serverless(app);
