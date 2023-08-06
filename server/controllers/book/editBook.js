import { CustomError } from "../../utils/index.js";
import { editBookQuery } from "../../queries/bookQueries/index.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const { API_SECRET, API_KEY, CLOUD_NAME } = process.env;

const editBook = async (req, res, next) => {
  const { bookId, author, title, description ,imageLink } = req.body;
  const file = req.file;
  const { id } = req.user;
  // console.log(req.body);
  console.log(req.file);
  try {
    if (!file) {
      try {
        await editBookQuery(bookId, author, title, description, imageLink, id);
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
      console.log(result);
      const imageLink = result.secure_url;
      try {
        await editBookQuery(bookId ,author, title, description, imageLink, id);
        return res.status(201).json({
          message: "Book and Image Edit Success",
        });
      } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
      }
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default editBook;
