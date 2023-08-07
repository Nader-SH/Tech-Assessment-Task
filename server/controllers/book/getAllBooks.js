import { CustomError } from "../../utils/index.js";
import { getBooksQuery } from "../../queries/bookQueries/index.js";
import dotenv from "dotenv";
dotenv.config();

const getBooks = async (req, res, next) => {
  const { id : userId } = req.user;
  try {
    const books = await getBooksQuery(userId);
    if (books[0] === undefined) {
      throw new CustomError(401,"You have no Books");
    }
    res.status(201).json(books);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default getBooks;
