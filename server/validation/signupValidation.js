import Joi from 'joi';

const signUpValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().max(10).required(),
    lastName: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validateAsync(data);
};

export default signUpValidation;