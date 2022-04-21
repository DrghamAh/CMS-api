const Joi = require('joi');

const NationaltySchema = Joi.object().keys({
  name : Joi.string().required(),
});

const validateNationalty = (nat) => {
  return NationaltySchema.validate({
    name : nat.name,
  })
}

module.exports = validateNationalty;