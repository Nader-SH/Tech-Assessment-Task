import { Book, User } from "../../models/index.js";

const getBooksNoAuthQuery = async (page) => {
  const limit = 6;
  return Book.findAll({

    where: {
      showBook: true,
    },
    attributes:["id","author","imageLink","title","description"],
    include: [
      {
        model: User,
        attributes:["id","first_name","last_name"],
      },
    ],
    limit,
    offset: (page - 1) * limit,
    order: [["createdAt", "DESC"]],
  });
};
export default getBooksNoAuthQuery;
