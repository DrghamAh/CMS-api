const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const SlotSchema = Joi.object().keys({
  day : Joi.string().valid('sat', 'sun', 'mon', 'tue', 'wed', "thu", "fri").required(),
  from : Joi.date().format('HH'),
  to : Joi.date().format('HH'),
  status : Joi.string().valid('a', 'u'),
});

const validateSlot = (slot) => {
  return SlotSchema.validate({
    day : slot.day,
    from : slot.from,
    to : slot.to,
    slot : slot.status,
  })
}

module.exports = validateSlot;