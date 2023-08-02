import { Book } from "../../models/index.js";

const editBookQuery = async (
  bookId,
  author,
  title,
  description,
  image_link,
  id
) =>
  Book.update(
    {
      author: author,
      title: title,
      description: description,
      image_link: image_link,
      user_id: id,
    },
    {
      where: {
        id: bookId,
        user_id: id,
      },
    }
  );

export default editBookQuery;
