const mongoose = require('mongoose');

const ExamSchema = mongoose.Schema({
  subjectId : {
    type : String,
    required : true,
  },
  maxDegree : {
    type : Number,
  },
  minDegree : {
    type : Number,
  },
  studyYear : {
    type : String,
  },
  date : {
    type : Date,
  },
  acadimcYear : {
    type : String,
  },
  interval : {
    type : Number,
  },
});

const Exam = mongoose.model('Exam', ExamSchema);

module.exports = Exam;