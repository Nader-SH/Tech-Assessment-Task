import { CustomError } from "../../utils/index.js";
import { getBookIdQuery } from "../../queries/bookQueries/index.js";

import dotenv from "dotenv";
dotenv.config();

const getBookId = async (req, res, next) => {
  const {id : userId} = req.user;
  const {id : bookId} = req.params;
    try {
      const book = await getBookIdQuery(bookId,userId);
      if (book === null) {
        throw new CustomError(401, "You Don't Have This Book in Your List")
      }
      res.status(201).json(book.dataValues);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
};

export default getBookId;
