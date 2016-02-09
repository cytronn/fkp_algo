var mongoose = require('mongoose');

var FamilySchema = new mongoose.Schema({
  name: String,
  definition: String
});

mongoose.model('Family', TypesSchema);
