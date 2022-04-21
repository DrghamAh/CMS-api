const Joi = require('joi');

const ClassSchema = Joi.object().keys({
  name : Joi.string().required(),
  code : Joi.string(),
  descripton : Joi.string(),
  subjects : Joi.array(),
});

module.exports = ClassSchema;