const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  prn: String,
  arr: Array,
  titleArr: Array,
});

module.exports = mongoose.model('User', userSchema);
