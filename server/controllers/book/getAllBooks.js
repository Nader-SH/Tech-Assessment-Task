import { CustomError } from "../../utils/index.js";
import { getBooksQuery } from "../../queries/bookQueries/index.js";
import dotenv from "dotenv";
dotenv.config();

const getBooks = async (req, res, next) => {
  const { id } = req.user;
  try {
    const books = await getBooksQuery(id);
    if (books[0] === undefined) {
      throw new CustomError(204, "You Don't Have any Books");
    }
    res.status(201).json(books);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default getBooks;
