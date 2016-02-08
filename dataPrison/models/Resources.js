var mongoose = require('mongoose');

var ResourceSchema = new mongoose.Schema({
  name: String,
  link: String
});

mongoose.model('Resource', ResourceSchema);
