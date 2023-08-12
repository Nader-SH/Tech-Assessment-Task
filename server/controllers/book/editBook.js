import { CustomError } from "../../utils/index.js";
import { editBookQuery } from "../../queries/bookQueries/index.js";
import { editBookValidation } from "../../validation/index.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const { API_SECRET, API_KEY, CLOUD_NAME } = process.env;

const editBook = async (req, res, next) => {
  const { bookId, author, title, description, image, showBook } = req.body;
  const file = req.file;
  const { id } = req.user;
  const data = {
    bookId: bookId,
    author: author,
    title: title,
    description: description,
    showBook: showBook,
    id: id,
  };
  try {
    const validData = await editBookValidation(data);
    if (!file) {
      try {
        await editBookQuery(
          validData.bookId,
          validData.author,
          validData.title,
          validData.description,
          validData.showBook,
          validData.id,
          image
        );
        return res.status(201).json({
          message: "Edit Book Success",
        });
      } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
      }
    } else {
      cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET,
      });
      const result = await cloudinary.uploader.upload(file.path);
      const imageLink = result.secure_url;
      try {
        await editBookQuery(
          validData.bookId,
          validData.author,
          validData.title,
          validData.description,
          validData.showBook,
          validData.id,
          imageLink,
        );
        return res.status(201).json({
          message: "Book and Image Edit Success",
        });
      } catch (error) {
        throw new CustomError(401,"Con't Update This Book");
      }
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default editBook;
