import { Book } from "../../models/index.js";

const editBookQuery = async (
  bookId,
  author,
  title,
  description,
  imageLink,
  id
) =>
  Book.update(
    {
      author: author,
      title: title,
      description: description,
      imageLink: imageLink,
    },
    {
      where: {
        id: bookId,
        user_id: id,
      },
    }
  );

export default editBookQuery;
