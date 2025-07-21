import express from 'express';
import serverless from 'serverless-http';
import UserService from '../services/UserService';
import CustomError from '../utils/CustomError'; // importe sua classe de erro personalizada

const app = express();
app.use(express.json());

// Função auxiliar para tratar erros e responder corretamente
function handleError(res: express.Response, error: unknown) {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ message: error.message, code: error.errorCode });
  } else if (error instanceof Error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Erro desconhecido' });
  }
}

// GET /users
app.get('/users', async (_req, res) => {
  try {
    const users = await UserService.fetchAllUsers();
    res.json(users);
  } catch (error) {
    handleError(res, error);
  }
});

// GET /users/:id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await UserService.fetchUserById(Number(req.params.id));
    res.json(user);
  } catch (error) {
    handleError(res, error);
  }
});

// POST /users
app.post('/users', async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
});

// PUT /users/:id
app.put('/users/:id', async (req, res) => {
  try {
    const user = await UserService.updateUser(Number(req.params.id), req.body);
    res.json(user);
  } catch (error) {
    handleError(res, error);
  }
});

// DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await UserService.deleteUser(Number(req.params.id));
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

// GET /users/total/count
app.get('/users/total/count', async (_req, res) => {
  try {
    const count = await UserService.getTotalUsers();
    res.json(count);
  } catch (error) {
    handleError(res, error);
  }
});

export default app;
