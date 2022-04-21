const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstname : {
    type : String,
    required : true,
  },
  lastname : {
    type : String,
    required : true,
  },
  father : {
    type : String,
    required : true,
  },
  mother : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
  },
  password : {
    type : String,
    min : 8,
  },
  phone : {
    type : String,
  },
  role : {
    type : String,
    default : 's', // S for student, a for admin, p for professor
  },
  gender : {
    type : String,
    max : 1,
    min : 1,
    default : 'm',
  },
  dateOfBirth : {
    type : Date,
  },
  image : {
    type : String,
  },
  departmentId : {
    type : ObjectId,
  },
  studyYear : {
    type : String,
    default : 'first'
  },
  registerationYear : {
    type : Date,
  },
  serialNumber : {
    type : String,
  },
  code : {
    type : String,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;