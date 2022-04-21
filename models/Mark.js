const mongoose = require('mongoose');

const MarkSchema = mongoose.Schema({
  userId : {
    type : String,
    required : true,
  },
  examId : {
    type : String,
    required : true,
  },
  rate : {
    type : Number,
  }
});

const Mark = mongoose.model('Mark', MarkSchema);

module.exports = Mark;