import { Book } from "../../models/index.js";

const editBookQuery = async (
  bookId,
  author,
  title,
  description,
  imageLink,
  showBook,
  id
) =>
  Book.update(
    {
      author: author,
      title: title,
      description: description,
      imageLink: imageLink,
      showBook : showBook,
    },
    {
      where: {
        id: bookId,
        user_id: id,
      },
    }
  );

export default editBookQuery;
