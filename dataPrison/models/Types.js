var mongoose = require('mongoose');

var TypesSchema = new mongoose.Schema({
  name: String,
  definition: String
});

mongoose.model('Types', TypesSchema);
