const mongoose = require('mongoose');

const EducationSchema = mongoose.Schema({
  userId : {
    type : String,
    required : true,
  },
  universityId : {
    type : String,
    required : true,
  },
  countryId : {
    type : String,
    required : true,
  },
  degree : {
    type : String,
    required : true,
  },
  title : {
    type : String,
  },
  yearPass : {
    type : Date,
  }
});

const Education = mongoose.model('Education', EducationSchema);

module.exports = Education;