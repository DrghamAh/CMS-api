const mongoose = require('mongoose');

const CollageSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  universityId : {
    type : String,
    required : true,
  },
});

const Collage = mongoose.model('Collage', CollageSchema);

module.exports = Collage;