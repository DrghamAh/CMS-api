const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const DepartmentScheam = Joi.object().keys({
  name : Joi.string().required(),
  numberOfYears : Joi.number().required(),
  image : Joi.string(),
  collageId : Joi.objectId(),
});

const validateDepartment = (dep, imagename) => {
  return DepartmentScheam.validate({
    name : dep.name,
    numberOfYears : dep.numberOfYears,
    image : imagename,
    collageId : dep.collageId,
  });
} 

module.exports = validateDepartment;