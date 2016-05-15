var express = require('express');
var router = express.Router();

var Favorite = require('../models/fav');


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// Favorites Main Page
router.get('/', function(req, res, next) {
  Favorite.find({})
  .then(function(favorites) {
    res.render('kravings/showFav', { favorites: favorites } );
  }, function(err) {
    return next(err);
  });
});


// Show Favorite List in detail
router.get('/info2', function(req, res, next) {
  Favorite.find({})
  .then(function(favorites) {
    res.render('kravings/showInfo2', { favorites: favorites } );
  }, function(err) {
    return next(err);
  });

});


module.exports = router;
