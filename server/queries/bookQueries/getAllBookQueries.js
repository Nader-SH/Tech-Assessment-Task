import { Book } from "../../models/index.js";
import { Op } from "sequelize";

const getBooksQuery = async (id, page) => {
  const limit = 6;
  return Book.findAll({
    attributes:["id","author","imageLink","title","description","createdAt" , "showBook"],
    where: {
      user_id: id,
    },
    limit,
    offset: (page - 1) * limit,
    order: [["createdAt", "DESC"]],
  });
};

const getBooksQuerySearch = async (id, searchText) => {
  return Book.findAll({
    attributes:["id","author","imageLink","title","description","createdAt"],
    where: {
      user_id: id,
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `${searchText}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `${searchText}%`,
          },
        },
      ],
    },
    order: [["createdAt", "DESC"]],
  });
};

export { getBooksQuery, getBooksQuerySearch };
