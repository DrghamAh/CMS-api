const mongoose = require('mongoose');

const SlotSchema = mongoose.Schema({
  from : {
    type : Date,
  },
  to : {
    type : Date,
  },
  day : {
    type : Date,
  },
  status : {
    type : String,
  }
});

const Slot = mongoose.model('Slot', SlotSchema);

module.exports = Slot;