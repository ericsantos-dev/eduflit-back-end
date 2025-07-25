import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/config';

export enum UserType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public birthDate!: string;
  public type!: UserType;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM(...Object.values(UserType)),
      allowNull: false,
    },

   
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false, 
  }
);
