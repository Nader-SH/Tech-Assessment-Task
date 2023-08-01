import { User } from '../../models/index.js';

const signInQuery = (userEmail) =>
User.findAll({
    where: {
      email: userEmail,
    },
  });

export default signInQuery;