const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const UserSchema = Joi.object().keys({
  firstname : Joi.string().required(),
  lastname : Joi.string().required(),
  father : Joi.string().required(),
  mother : Joi.string().required(),
  email : Joi.string().email({minDomainSegments: 2}).required(),
  phone : Joi.string().min(6).regex(/^([+])?(\d+)$/).required(),
  role : Joi.string().valid('a', 'p', 's'),
  studyYear : Joi.string().valid('first', 'second', 'third', 'fourth', 'fifth', 'deploma', 'master', 'doctroa'),
  departmentId : Joi.objectId(),
  gender : Joi.string().max(1).valid('f', 'm', 't', 'o'),
  registerationYear : Joi.date().required(),
  serialNumber : Joi.string(),
  code : Joi.string(),
});

const validateUser = (user) => {
  return UserSchema.validate({
    firstname : user.firstname,
    lastname : user.lastname,
    father : user.father,
    mother : user.mother,
    email : user.email,
    phone : user.phone,
    role : user.role,
    studyYear : user.studyYear,
    departmentId : user.departmentId,
    gender : user.gender,
    registerationYear : Date('YYYY'),
    serialNumber : user.serialNumber,
    code : user.code,
  }, {abortEarly : false})
}

module.exports = validateUser;