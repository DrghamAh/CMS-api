const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
  name : {
    type : String,
  },
  image : {
    type : String,
  },
  code : {
    type : String,
  }
})

const Country = mongoose.model('Country', CountrySchema);

module.exports = Country;