import { findUserEmail, signUpQuery } from "../../queries/userQueries/index.js";
import { CustomError } from "../../utils/index.js";
import pkg from "bcryptjs";
const { hash } = pkg;
import { signUpValidation } from "../../validation/index.js";

const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const validation = await signUpValidation(req.body);
    console.log(validation,"sssssddddddd");
    const emailExisted = await findUserEmail(req.body.email);
    if (emailExisted) {
      throw new CustomError(400,"This email is already existed");
    }
    const hashed = await hash(password, 10);
    const userData = await signUpQuery(firstName,lastName, email, hashed);

    return res.status(201).json({
      userData: userData,
      message: "Success",
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default signUp;
