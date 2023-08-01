import Book from "./book.js";
import User from "./user.js";
import sequelize from "../database/config/connection.js";

User.hasMany(Book, { foreignKey: "user_id" });
Book.belongsTo(User, { foreignKey: "user_id" });

export{
    Book,
    User,
    sequelize,
}