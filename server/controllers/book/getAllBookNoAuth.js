import { CustomError } from "../../utils/index.js";
import { getBooksNoAuthQuery } from "../../queries/bookQueries/index.js";

const getBooksNoAuth = async (req, res, next) => {
  const { page } = req.query;
  try {
    const books = await getBooksNoAuthQuery(page);
    if(!books[0]){
        throw new CustomError(401,"No Books Yet !!");
    }
    res.status(201).json(books);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default getBooksNoAuth;
