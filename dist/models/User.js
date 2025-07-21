"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserType = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
var UserType;
(function (UserType) {
    UserType["STUDENT"] = "student";
    UserType["TEACHER"] = "teacher";
})(UserType || (exports.UserType = UserType = {}));
class User extends sequelize_1.Model {
    id;
    name;
    email;
    password;
    birthDate;
    type;
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(UserType)),
        allowNull: false,
    },
}, {
    sequelize: config_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
//# sourceMappingURL=User.js.map