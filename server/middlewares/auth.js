import { CustomError, verifyToken } from "../utils/index.js";

const auth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const { token } = req.cookies;
    if (!token) throw new CustomError(401, "Unauthorized");
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
