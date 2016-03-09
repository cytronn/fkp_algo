var mongoose = require('mongoose');

var DISchema = new mongoose.Schema({
  name: String,
  coordinates: String,
  population_by_year: {year: [], population:[]},
  prisons:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prison'
  }],
});

mongoose.model('DI', DISchema);
