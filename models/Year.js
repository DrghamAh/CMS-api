const mongoose = require('mongoose');

const YearSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  collageId : {
    type : String,
  },
  departmentId : {
    type : String,
  },
  doctors : {
    type : Array,
  },
});

const Year = mongoose.model('Year', YearSchema);

module.exports = Year;

