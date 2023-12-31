import { Model, DataTypes } from "sequelize";
import sequelize from "../database/config/connection.js";

export default class Book extends Model {
  id;
  author;
  title;
  description;
  imageLink;
  showBook;
  user_id;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    showBook: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    imageLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize }
);
