const mongoose = require('mongoose');

const NationaltySchema = mongoose.Schema({
  name : {
    type : String,
  }
});

const Nationalty = mongoose.model('Nationalty', NationaltySchema);

module.exports = Nationalty;