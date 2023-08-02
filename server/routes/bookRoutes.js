import { Router } from "express";
import {
  addBook,
  editBook,
  deleteBook,
  getBooks,
} from "../controllers/book/index.js";
import { auth } from "../middlewares/index.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const bookRouter = Router();

bookRouter.post("/addbook", auth, upload.single("image"), addBook);
bookRouter.post("/editbook", auth, upload.single("image"), editBook);
bookRouter.post("/deletebook", auth, deleteBook);
bookRouter.get("/getbooks", auth, getBooks);

export default bookRouter;
