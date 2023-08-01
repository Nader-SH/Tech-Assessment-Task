import { User } from "../../models/index.js";

const findUserEmail = async (email) =>
  User.findOne({
    where: {
      email,
    },
  });

export default findUserEmail;