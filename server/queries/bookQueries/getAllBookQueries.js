import { Book } from "../../models/index.js";

const getBooksQuery = async (id) =>
  Book.findAll({
    where: {
      user_id: id,
    },
  });

export default getBooksQuery;
