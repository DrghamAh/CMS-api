const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const UniversitySchema = Joi.object().keys({
  name : Joi.string().required(),
  countryId : Joi.objectId().required(),
});

const validateUniversity = (university) => {
  return UniversitySchema.validate({
    name : university.name,
    countryId : university.countryId,
  }, {abortEarly : false});
}

module.exports = validateUniversity;