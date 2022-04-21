const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const MarkSchema = Joi.object().keys({
  userId : Joi.objectId().required(),
  examId : Joi.objectId().required(),
  rate : Joi.number(),
});

const validateMark = (mark) => {
  return MarkSchema.validate({
    userId : mark.userId,
    examId : mark.examId,
    rate : mark.rate
  })
}

module.exports = validateMark