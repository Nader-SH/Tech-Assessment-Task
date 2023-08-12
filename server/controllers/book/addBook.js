import { CustomError } from "../../utils/index.js";
import { addBookQuery } from "../../queries/bookQueries/index.js";
import { addBookValidation } from "../../validation/index.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const { API_SECRET, API_KEY, CLOUD_NAME } = process.env;

const addBook = async (req, res, next) => {
  const { author, title, description, image, showBook } = req.body;
  const file = req.file;
  const { id } = req.user;
  const data = {
    author: author,
    title: title,
    description: description,
    showBook: showBook,
  };
  try {
    await addBookValidation(data);
    if (!file) {
      try {
        const image = "";
        await addBookQuery(author, title, description, image, showBook, id);
        return res.status(201).json({
          message: "Book Add Success",
        });
      } catch (error) {
        throw new CustomError(401, "Con't Add this Book");
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
        await addBookQuery(author, title, description, imageLink, showBook, id);
        return res.status(201).json({
          message: "Book and Image Add Success",
        });
      } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
      }
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default addBook;
