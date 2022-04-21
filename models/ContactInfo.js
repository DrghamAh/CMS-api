const mongoose = require('mongoose');

const ConteactInfoSchema = mongoose.Schema({
  userId : {
    type : String,
    required : true,
  },
  anotherPhone : {
    type : String,
  },
  addressOne : {
    type : String,
  },
  addressTwo : {
    type : String,
  },
  countryId : {
    type : String,
    required : true,
  },
  state : {
    type : String,
    required : true,
  },
  nationalityId : {
    type : String,
    required : true,
  },
  facebook : {
    type : String,
  },
  twitter : {
    type : String,
  },
  instagram : {
    type : String,
  },
  linkedin : {
    type : String,
  }
});

const ContactInfo = mongoose.model('ContactInfo', ConteactInfoSchema);

module.exports = ContactInfo;