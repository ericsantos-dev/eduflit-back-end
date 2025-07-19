import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

const userRouter = Router();

// Get all users
userRouter.get('/users', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.fetchAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get user by ID
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const user = await UserService.fetchUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Get user by email (query param example)
userRouter.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email;
    const user = await UserService.fetchUserByEmail(email);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Create a new user
userRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// Update user by ID
userRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updatedUser = await UserService.updateUser(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Delete user by ID
userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await UserService.deleteUser(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get total users count
userRouter.get('/count/total', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const total = await UserService.getTotalUsers();
    res.json(total);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
