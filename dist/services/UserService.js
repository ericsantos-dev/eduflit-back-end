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
const User_1 = require("../models/User");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
class UserService {
    fetchAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.User.findAll();
                if (users.length === 0) {
                    throw new CustomError_1.default('No users found', 404, 'NO_USERS_FOUND');
                }
                return users;
            }
            catch (error) {
                throw new CustomError_1.default(`Error fetching users: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_FETCH_FAILED');
            }
        });
    }
    fetchUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findByPk(id);
                if (!user)
                    throw new CustomError_1.default('User not found', 404, 'USER_NOT_FOUND');
                return user;
            }
            catch (error) {
                throw new CustomError_1.default(`Error fetching user: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_FETCH_FAILED');
            }
        });
    }
    fetchUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ where: { email } });
                if (!user)
                    throw new CustomError_1.default('User not found', 404, 'USER_NOT_FOUND');
                return user;
            }
            catch (error) {
                throw new CustomError_1.default(`Error fetching user by email: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_FETCH_FAILED');
            }
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.create(data);
                return user;
            }
            catch (error) {
                throw new CustomError_1.default(`Error creating user: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_CREATION_FAILED');
            }
        });
    }
    updateUser(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.fetchUserById(id);
                yield user.update(updatedData);
                return user;
            }
            catch (error) {
                throw new CustomError_1.default(`Error updating user: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_UPDATE_FAILED');
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.fetchUserById(id);
                yield user.destroy();
                return { message: 'User successfully deleted.' };
            }
            catch (error) {
                throw new CustomError_1.default(`Error deleting user: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_DELETION_FAILED');
            }
        });
    }
    getTotalUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield User_1.User.count();
                return { totalUsers: count };
            }
            catch (error) {
                throw new CustomError_1.default(`Error getting total users: ${error instanceof Error ? error.message : String(error)}`, 500, 'USER_COUNT_FAILED');
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map