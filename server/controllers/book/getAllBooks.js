import { CustomError } from "../../utils/index.js";
import {
  getBooksQuery,
  getBooksQuerySearch,
} from "../../queries/bookQueries/index.js";
import dotenv from "dotenv";
dotenv.config();

const getBooks = async (req, res, next) => {
  const { id: userId } = req.user;
  const { page, searchText } = req.query;
  try {
    if (searchText !== "") {
      const books = await getBooksQuerySearch(userId, searchText);
      if (books[0] === undefined) {
        throw new CustomError(401, "You have no Books");
      }
      res.status(201).json({ searchBooksData: books });
    } else {
      const books = await getBooksQuery(userId, page);
      if (books[0] === undefined) {
        throw new CustomError(401, "You have no Books");
      }
      res.status(201).json(books);
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default getBooks;
