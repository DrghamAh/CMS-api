const Joi = require('joi');

const CountrySchema = Joi.object().keys({
  name : Joi.string().required(),
  image : Joi.string(),
  code : Joi.string(),
})

const validateCountry = (country) => {
  return CountrySchema.validate({
    name : country.name,
    image : country.image,
    code : country.code,
  }, {abortEarly : false})
}

module.exports = validateCountry;