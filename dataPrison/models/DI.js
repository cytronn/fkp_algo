var mongoose = require('mongoose');

var DISchema = new mongoose.Schema({
  name: String,
  coordinates: String,
  population_by_year: {year: Number, population: Number}
});

mongoose.model('DI', DISchema);
