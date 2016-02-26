var mongoose = require('mongoose');

var DISchema = new mongoose.Schema({
  name: String,
  coordinates: String,
  population_by_year: {year: [], population:[]}
});

mongoose.model('DI', DISchema);
