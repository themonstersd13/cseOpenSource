const mongoose = require('mongoose');

const domainDataSchema = new mongoose.Schema({
  idName: String,
  arr: Array,
  titleArr: Array,
});

module.exports = mongoose.model('DomainData', domainDataSchema);
