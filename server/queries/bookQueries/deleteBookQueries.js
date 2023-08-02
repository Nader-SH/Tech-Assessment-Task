import { Book } from "../../models/index.js";

const deleteBookQuery = async (bookId, id) =>
  Book.destroy({
    where: {
      id: bookId,
      user_id: id,
    },
  });
export default deleteBookQuery;
