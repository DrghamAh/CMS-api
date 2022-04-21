const mongoose = require('mongoose');

const PlaceShcema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  seats : {
    type : Number,
  },
  code : {
    type : String,
  }
});

const Place = mongoose.model('Place', PlaceShcema);

module.exports = Place;