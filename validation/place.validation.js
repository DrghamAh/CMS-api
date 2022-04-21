const Joi = require('joi');

const PlaceShcema = Joi.object().keys({
  name : Joi.string().required(),
  seats : Joi.number().min(1),
  code : Joi.string(),
});

const validatePlace = (place) => {
  return PlaceShcema.validate({
    name : place.name,
    seats : place.seats,
    code : place.code,
  })
}

module.exports = validatePlace;