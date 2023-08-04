import pkg from "bcryptjs";
const { compare } = pkg;
import { findUserEmail } from "../../queries/userQueries/index.js";
import { generateToken, CustomError } from "../../utils/index.js";
import { signinValidation } from "../../validation/index.js";
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    await signinValidation(req.body);
    const loginData = await findUserEmail(email);
    if (loginData === null) {
      throw new CustomError(400, "Invalid email or password, Try again");
    }
    const passwordDb = loginData.dataValues.password;
    const passwordCompare = await compare(password, passwordDb);
    if (!passwordCompare) {
      throw new CustomError(400, "Wrong Password, Try again");
    }
    const token = await generateToken({
      id: loginData.dataValues.id,
      email: loginData.dataValues.email,
      firstName: loginData.dataValues.first_name,
      lastName: loginData.dataValues.last_name,
    });

   return res.cookie("token", token, { httpOnly: true }).json({
      data: {
        id: loginData.dataValues.id,
        email: loginData.dataValues.email,
        firstName: loginData.dataValues.first_name,
        lastName: loginData.dataValues.last_name,
      },
      // token:token,
      message: "Success",
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default signIn;
