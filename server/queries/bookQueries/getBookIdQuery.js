import { Book } from "../../models/index.js";

const getBookIdQuery = async (bookId, id) =>
  Book.findOne({
    where: {
      id: bookId,
      user_id: id,
    },
    order: [["createdAt", "DESC"]],
  });

export default getBookIdQuery;
