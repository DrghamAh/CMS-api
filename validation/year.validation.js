const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const YearSchema = Joi.object().keys({
  name : Joi.string().required(),
  collageId : Joi.objectId(),
  departmentId : Joi.objectId(),
  profesors : Joi.array().items(Joi.objectId()),
})

const validateYear = (year) => {
  return YearSchema.validate({
    name : year.name,
    collageId : year.collageId,
    departmentId : year.departmentId,
    profesors : year.profesors,
  });
}

module.exports = validateYear;