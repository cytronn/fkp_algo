var mongoose = require('mongoose');

var PrisonSchema = new mongoose.Schema({
  name: String,
  coordinates: {x: Number, y: Number},
  interregional_direction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DI'
  },
  population: Number,
  density: Number,
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family'
  },
});

PrisonSchema.methods.inDir = function(interregional_direction, prison) {
  
};

mongoose.model('Prison', PrisonSchema);
