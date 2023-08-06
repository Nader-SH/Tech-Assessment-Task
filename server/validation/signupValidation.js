import Joi from 'joi';

const signUpValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().max(15).required(),
    lastName: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validateAsync(data);
};

export default signUpValidation;