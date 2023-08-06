import { CustomError } from "../../utils/index.js";
import { deleteBookQuery } from "../../queries/bookQueries/index.js";
import dotenv from "dotenv";
dotenv.config();

const deleteBook = async (req, res, next) => {
  const { bookId } = req.body;
  const { id } = req.user;
  try {
    const data = await deleteBookQuery(bookId, id);
    if (data === 0) {
      throw new CustomError(403, "Not Found");
    }
    return res.status(201).json({
      message: "Delete Book Success",
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default deleteBook;
