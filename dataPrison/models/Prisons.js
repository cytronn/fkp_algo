var mongoose = require('mongoose');

var PrisonSchema = new mongoose.Schema({
  coordinates: {x: Number, y: Number},
  interregional_direction: { type: mongoose.Schema.Types.ObjectId, ref: 'DI' },
  population: Number,
  density: Number,
  family: String,
  family_id: Number,
});


mongoose.model('Prison', PrisonSchema);
