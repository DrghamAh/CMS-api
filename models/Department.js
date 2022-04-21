const mongoose = require('mongoose');

const DepartmentScheam = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  numberOfYears : {
    type : Number,
    required : true,
  },
  image : {
    type : String,
  },
  collageId : {
    type : String,
  }
})

const Department = mongoose.model('Department', DepartmentScheam);

module.exports = Department;