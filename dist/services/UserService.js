"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
class UserService {
    async fetchAllUsers() {
        try {
            const users = await User_1.User.findAll();
            if (users.length === 0) {
                throw new CustomError_1.default('No users found', 404, 'NO_USERS_FOUND');
            }
            return users;
        }
        catch (error) {
            throw new CustomError_1.default(`Error fetching users: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_FETCH_FAILED');
        }
    }
    async fetchUserById(id) {
        try {
            const user = await User_1.User.findByPk(id);
            if (!user)
                throw new CustomError_1.default('User not found', 404, 'USER_NOT_FOUND');
            return user;
        }
        catch (error) {
            throw new CustomError_1.default(`Error fetching user: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_FETCH_FAILED');
        }
    }
    async fetchUserByEmail(email) {
        try {
            const user = await User_1.User.findOne({ where: { email } });
            if (!user)
                throw new CustomError_1.default('User not found', 404, 'USER_NOT_FOUND');
            return user;
        }
        catch (error) {
            throw new CustomError_1.default(`Error fetching user by email: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_FETCH_FAILED');
        }
    }
    async createUser(data) {
        try {
            const user = await User_1.User.create(data);
            return user;
        }
        catch (error) {
            throw new CustomError_1.default(`Error creating user: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_CREATION_FAILED');
        }
    }
    async updateUser(id, updatedData) {
        try {
            const user = await this.fetchUserById(id);
            await user.update(updatedData);
            return user;
        }
        catch (error) {
            throw new CustomError_1.default(`Error updating user: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_UPDATE_FAILED');
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.fetchUserById(id);
            await user.destroy();
            return { message: 'User successfully deleted.' };
        }
        catch (error) {
            throw new CustomError_1.default(`Error deleting user: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_DELETION_FAILED');
        }
    }
    async getTotalUsers() {
        try {
            const count = await User_1.User.count();
            return { totalUsers: count };
        }
        catch (error) {
            throw new CustomError_1.default(`Error getting total users: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_COUNT_FAILED');
        }
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map