const Joi = require('joi');

// Validation schema for creating a new poem
const createPoemSchema = Joi.object({
  poem_id: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  author_id: Joi.string().required(),
  author: Joi.string().required(),
  date_created: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

// Validation schema for updating a poem
const updatePoemSchema = Joi.object({
  poem_id: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  author_id: Joi.string().required(),
  author: Joi.string().required(),
  date_created: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

// Middleware function for validating createPoem request
const validateCreatePoem = (req, res, next) => {
  const { error } = createPoemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Middleware function for validating updatePoem request
const validateUpdatePoem = (req, res, next) => {
  const { error } = updatePoemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateCreatePoem,
  validateUpdatePoem,
};
