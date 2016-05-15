var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Kraving = require('./kraving');
var Favorite = require('./fav');

var User = new mongoose.Schema({
  local : {
    firstname    : String,
    lastname    : String,
    email    : String,
    password : String
  },
  kravings : [Kraving.schema],
  favorites : [Favorite.schema]
});

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
