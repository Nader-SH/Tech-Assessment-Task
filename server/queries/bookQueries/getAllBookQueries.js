import { Book } from "../../models/index.js";
import { Op } from "sequelize";

const getBooksQuery = async (id, page) => {
  const limit = 6;
  return Book.findAll({
    where: {
      user_id: id,
    },
    limit,
    offset: (page - 1) * limit,
  });
};

const getBooksQuerySearch = async (id, searchText) => {
  return Book.findAll({
    where: {
      user_id: id,
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `${searchText}%`, // StartsWith search for title
          },
        },
        {
          author: {
            [Op.iLike]: `${searchText}%`, // StartsWith search for author
          },
        },
      ],
    },
  });
};

export { getBooksQuery, getBooksQuerySearch };
