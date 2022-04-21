const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const ExamSchema = Joi.object().keys({
  subjectId : Joi.objectId().required(),
  maxDegree : Joi.number().required(),
  minDegree : Joi.number().required(),
  studyYear : Joi.string().valid('first', 'second', 'third', 'fourth', 'fifth', 'deploma', 'master', 'doctroa'),
  date : Joi.date(),
  acadmicYear : Joi.string(),
  interval : Joi.number(),
})

const validateExam = (exam) => {
  return ExamSchema.validate({
    subjectId : exam.subjectId,
    maxDegree : exam.maxDegree,
    minDegree : exam.minDegree,
    studyYear : exam.studyYear,
    date : exam.date,
    acadmicYear : exam.acadmicYear,
    interval : exam.interval,
  });
}

module.exports = validateExam;