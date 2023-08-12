import Joi from "joi";

const editBookValidation = (data) => {
  const schema = Joi.object({
    bookId : Joi.number().required(),
    author: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    showBook: Joi.boolean().required(),
    id : Joi.number().required(),
  });

  return schema.validateAsync(data);
};

export default editBookValidation;
