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
const express_1 = require("express");
const UserService_1 = __importDefault(require("../services/UserService"));
const userRouter = (0, express_1.Router)();
userRouter.get('/users', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserService_1.default.fetchAllUsers();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const user = yield UserService_1.default.fetchUserById(id);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.get('/email/:email', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const user = yield UserService_1.default.fetchUserByEmail(email);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.post('/create', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield UserService_1.default.createUser(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const updatedUser = yield UserService_1.default.updateUser(id, req.body);
        res.json(updatedUser);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const result = yield UserService_1.default.deleteUser(id);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.get('/count/total', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield UserService_1.default.getTotalUsers();
        res.json(total);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = userRouter;
//# sourceMappingURL=user.js.map