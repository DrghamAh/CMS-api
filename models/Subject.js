const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  code : {
    type : String,
  },
  image : {
    type : String,
  },
  profesorId : {
    type : String,
  },
  departmentId : {
    type : String,
  },
  studyYear : {
    type : String,
    default : 'first'
  }
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;