import { Router } from "express";

import userRouter from "./userRoutes.js";
import bookRouter from "./bookRoutes.js";

const router = Router();

router.use("/", userRouter);
router.use("/", bookRouter);

export default router;
