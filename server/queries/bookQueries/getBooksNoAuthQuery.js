import { Book, User } from "../../models/index.js";

const getBooksNoAuthQuery = async (page) => {
  const limit = 6;
  return Book.findAll({
    where: {
      showBook: true,
    },
    include: [
      {
        model: User,
      },
    ],
    limit,
    offset: (page - 1) * limit,
  });
};
export default getBooksNoAuthQuery;
