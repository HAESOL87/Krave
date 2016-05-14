var mongoose = require('mongoose');

var FavoriteSchema = new mongoose.Schema({
  name:  {type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model('Favorite', FavoriteSchema);
