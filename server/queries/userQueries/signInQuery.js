import { User } from '../../models/index.js';

const signInQuery = (userEmail) =>
User.findOne({
    where: {
      email: userEmail,
    },
  });

export default signInQuery;