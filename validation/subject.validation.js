const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const SubjectSchema = Joi.object().keys({
  name : Joi.string().required(),
  code : Joi.string(),
  image : Joi.string(),
  profesorId : Joi.objectId().required(),
  departmentId : Joi.objectId().required(),
  studyYear : Joi.string().valid('first', 'second', 'third', 'fourth', 'fifth', 'deploma', 'master', 'doctroa').required(),
});

const validateSubject = (sub) => {
  return SubjectSchema.validate({
    name : sub.name,
    code : sub.code,
    image : sub.image,
    profesorId : sub.profesorId,
    departmentId : sub.departmentId,
    studyYear : sub.studyYear,
  })
}

module.exports = validateSubject;