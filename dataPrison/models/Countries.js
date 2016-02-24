var mongoose = require('mongoose');

var CountrySchema = new mongoose.Schema({
  code: String,
  name: String,
  rate: Number
});

mongoose.model('Country', CountrySchema);
