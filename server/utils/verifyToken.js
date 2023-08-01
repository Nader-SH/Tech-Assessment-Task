import pkg from 'jsonwebtoken';
const { verify } = pkg;
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    const key = SECRET_KEY || "";
    verify(token, key, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

export default verifyToken;
