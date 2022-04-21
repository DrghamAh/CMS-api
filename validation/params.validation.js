const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const ObjectIdSchema = Joi.object().keys({
  id : Joi.objectId().required(),
})

const RoleSchema = Joi.object().keys({
  role : Joi.string().valid('s', 'p', 'a'),
})

const validateObjectId = (id) =>{
  ObjectIdSchema.validate({
    id : id,
  });
};

const validateRole = (role) => {
  RoleSchema.validate({
    role : role
  });
}

module.exports = {validateRole, validateObjectId}
