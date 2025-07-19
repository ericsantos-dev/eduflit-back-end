import AppDataSource from '../database/config';
import { Repository } from 'typeorm';
import { User, UserType } from '../models/User';
import CustomError from '../utils/CustomError';

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  public async fetchAllUsers() {
    try {
      const users = await this.userRepository.find();
      if (users.length === 0) {
        throw new CustomError('No users found', 404, 'NO_USERS_FOUND');
      }
      return users;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError(
        `Error fetching users: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_FETCH_FAILED'
      );
    }
  }

  public async fetchUserById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
      return user;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError(
        `Error fetching user: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_FETCH_FAILED'
      );
    }
  }

  public async fetchUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
      return user;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError(
        `Error fetching user by email: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_FETCH_FAILED'
      );
    }
  }

  public async createUser(data: Partial<User>) {
    try {
      const user = this.userRepository.create(data);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new CustomError(
        `Error creating user: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_CREATION_FAILED'
      );
    }
  }

  public async updateUser(id: number, updatedData: Partial<User>) {
    try {
      const user = await this.fetchUserById(id);
      Object.assign(user, updatedData);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError(
        `Error updating user: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_UPDATE_FAILED'
      );
    }
  }

  public async deleteUser(id: number) {
    try {
      const user = await this.fetchUserById(id);
      await this.userRepository.remove(user);
      return { message: 'User successfully deleted.' };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError(
        `Error deleting user: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_DELETION_FAILED'
      );
    }
  }

  public async getTotalUsers() {
    try {
      const count = await this.userRepository.count();
      return { totalUsers: count };
    } catch (error) {
      throw new CustomError(
        `Error getting total users: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_COUNT_FAILED'
      );
    }
  }
}

export default new UserService();
