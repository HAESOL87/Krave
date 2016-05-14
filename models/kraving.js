var mongoose = require('mongoose');

var KravingSchema = new mongoose.Schema({
  name:  {type: String, required: true },
  city:  type: String,
  state: type: String,
  zip:  type: Integer,
  favorite:  type: Boolean
}, timestamps: true});

module.exports = mongoose.model('Kraving', KravingSchema);
