var mongoose = require('mongoose');

var FactSchema = new mongoose.Schema({
  date: Number,
  name: String,
  description : String
});

mongoose.model('Fact', FactSchema);
