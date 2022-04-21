require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGODB_URL);
}

module.exports = { connectToDatabase };