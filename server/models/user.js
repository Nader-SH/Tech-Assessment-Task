import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class User extends Model {
  id;
  first_name;
  last_name
  email;
  password;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
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
  },
  { sequelize }
);