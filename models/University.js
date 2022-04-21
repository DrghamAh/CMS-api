const mongoose = require('mongoose');

const UniversitySchema = mongoose.Schema({
  name : {
    type : String,
  },
  countryId : {
    type : String,
  }
});

const University = mongoose.model('Universiy', UniversitySchema);

module.exports = University;