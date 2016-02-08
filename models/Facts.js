var mongoose = require('mongoose');

var FactSchema = new mongoose.Schema({
  date: Number,
  name: String,
  desciption : String
});

mongoose.model('Fact', FactSchema);
