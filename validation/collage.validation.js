const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const CollageSchema = Joi.object().keys({
  name : Joi.string().required(),
  universityId : Joi.objectId().required()
});

const validateCollage = (collage) => {
  return CollageSchema.validate({
    name : collage.name,
    universityId : collage.universityId
  });
}

module.exports = validateCollage;