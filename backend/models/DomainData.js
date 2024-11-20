const domainDataSchema = new mongoose.Schema(
  {
    idName: String,
    arr: Array,
    titleArr: Array,
  },
  { collection: 'DomainData' } 
);

module.exports = mongoose.model('DomainData', domainDataSchema);
