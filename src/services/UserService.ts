import { User } from '../models/User';
import CustomError from '../utils/CustomError';

class UserService {
  public async fetchAllUsers() {
    try {
      const users = await User.findAll();
      if (users.length === 0) {
        throw new CustomError('No users found', 404, 'NO_USERS_FOUND');
      }
      return users;
    } catch (error) {
      throw new CustomError(
        `Error fetching users: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_FETCH_FAILED'
      );
    }
  }

  public async fetchUserById(id: number) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
      return user;
    } catch (error) {
      throw new CustomError(
        `Error fetching user: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_FETCH_FAILED'
      );
    }
  }

  public async fetchUserByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
      return user;
    } catch (error) {
      throw new CustomError(
        `Error fetching user by email: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_FETCH_FAILED'
      );
    }
  }

  public async createUser(data: Partial<User>) {
    try {
      const user = await User.create(data);
      return user;
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
      await user.update(updatedData);
      return user;
    } catch (error) {
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
      await user.destroy();
      return { message: 'User successfully deleted.' };
    } catch (error) {
      throw new CustomError(
        `Error deleting user: ${error instanceof Error ? error.message : String(error)}`,
        500,
        'USER_DELETION_FAILED'
      );
    }
  }

  public async getTotalUsers() {
    try {
      const count = await User.count();
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
