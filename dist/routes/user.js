"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = __importDefault(require("../services/UserService"));
const userRouter = (0, express_1.Router)();
userRouter.get('/users', async (_req, res, next) => {
    try {
        const users = await UserService_1.default.fetchAllUsers();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
userRouter.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const user = await UserService_1.default.fetchUserById(id);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
userRouter.get('/email/:email', async (req, res, next) => {
    try {
        const email = req.params.email;
        const user = await UserService_1.default.fetchUserByEmail(email);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
userRouter.post('/create', async (req, res, next) => {
    try {
        const newUser = await UserService_1.default.createUser(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
userRouter.put('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const updatedUser = await UserService_1.default.updateUser(id, req.body);
        res.json(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
userRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const result = await UserService_1.default.deleteUser(id);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
userRouter.get('/count/total', async (_req, res, next) => {
    try {
        const total = await UserService_1.default.getTotalUsers();
        res.json(total);
    }
    catch (error) {
        next(error);
    }
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map