const mongoose = require('mongoose');

const LectureSchema = mongoose.Schema({
  title : {
    type : String,
  },
  description : {
    type : String,
  },
  index : {
    type : Number,
  },
  subjectId : {
    type : String,
  },
  doctorId : {
    type : String,
  },
  slotId : {
    type : String,
  },
  placeId : {
    type : String,
  },
  code : {
    type : String,
  }
});

const Lecture = mongoose.model('Lecture', LectureSchema);

module.exports = Lecture;