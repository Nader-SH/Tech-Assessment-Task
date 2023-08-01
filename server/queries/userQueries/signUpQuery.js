import { User } from "../../models/index.js";

const signUpQuery = async (firstName, lastName, email, hashed) =>
  User.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: hashed,
  });

export default signUpQuery;
