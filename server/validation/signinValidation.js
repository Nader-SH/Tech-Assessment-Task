import Joi from "joi";

const signinValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validateAsync(data);
};

export default signinValidation;
