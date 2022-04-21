const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

const EducationSchema = Joi.object().keys({
  userId : Joi.objectId().required(),
  universityId : Joi.objectId().required(),
  countryId : Joi.objectId().required(),
  degree : Joi.number().min(1).max(100),
  title : Joi.string().required(),
  yearPass : Joi.date().format('YYY'),
});

const validateEducation = (edu) => {
  return EducationSchema.validate({
    userId : edu.userId,
    universityId : edu.universityId,
    countryId : edu.countryId,
    degree : edu.degree,
    title : edu.title,
    yearPass : edu.yearPass,
  });
}

module.exports = validateEducation;