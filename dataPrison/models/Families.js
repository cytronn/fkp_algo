var mongoose = require('mongoose');

var FamilySchema = new mongoose.Schema({
  name: String,
  definition: String,
  prisons:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prison'
  }],
});

mongoose.model('Family', FamilySchema);
