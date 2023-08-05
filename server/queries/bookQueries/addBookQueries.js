import { Book } from "../../models/index.js";

const addBookQuery = async (author, title, description, image_link, id) =>
  Book.create({
    author: author,
    title: title,
    description: description,
    imageLink: image_link,
    user_id: id,
  });

export default addBookQuery;
