import { Router } from "express";
import {
  addBook,
  editBook,
  deleteBook,
  getBooks,
  getBookId,
  getBooksNoAuth,
} from "../controllers/book/index.js";
import { auth } from "../middlewares/index.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const bookRouter = Router();

bookRouter.post("/addbook", auth, upload.single("image"), addBook);
bookRouter.post("/editbook", auth, upload.single("image"), editBook);
bookRouter.post("/deletebook", auth, deleteBook);
bookRouter.get("/getbooks", auth, getBooks);
bookRouter.get("/getbookid/:id", auth, getBookId);
bookRouter.get("/getbooksnoauth",getBooksNoAuth);

export default bookRouter;
