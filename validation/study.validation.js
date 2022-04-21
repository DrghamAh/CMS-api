const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi)

const StudySchema = Joi.object().keys({
  userId : Joi.objectId().required(),
  degree : Joi.string().required(),
  yearPass : Joi.date().format('YYYY-MM-DD').required(),
  collageId : Joi.objectId().required(),
});

module.exports = StudySchema;