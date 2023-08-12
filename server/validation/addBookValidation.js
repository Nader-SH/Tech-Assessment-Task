import Joi from "joi";

const addBookValidation = (data) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    showBook: Joi.boolean().required(),
  });

  return schema.validateAsync(data);
};

export default addBookValidation;
