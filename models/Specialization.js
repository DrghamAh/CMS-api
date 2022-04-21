const mongoose = require('mongoose');

const SpecializationSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  years : {
    type : Number,
    required : true,
  },
  code : {
    type : String,
  },
})