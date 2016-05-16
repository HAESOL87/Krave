var express = require('express');
var router = express.Router();

var Favorite = require('../models/fav');
var Kraving = require('../models/kraving');


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

// Create Fav
router.post('/', function(req, res, next) {
  var favorite = new Favorite({
    name: "Kroger"
    // _id:
  });
  favorite.save()
  .then(function(saved) {
    res.redirect('/favs');
  }, function(err) {
    return next(err);
  });
});

// Show Global Map
router.get('/:id', function(req, res, next) {
  Favorite.findById(req.params.id)
  .then(function(favorite) {
    if (!favorite) return next(makeError(res, 'Document not found', 404));
    res.render('kravings/showInfo2', { favorite: favorite});
  }, function(err) {
    return next(err);
  });
});

// Destroy Favorites
router.delete('/:id', function(req, res, next) {
  Favorite.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/favs');
  }, function(err) {
    return next(err);
  });
});

// // Show Favorite List in detail
// router.get('/info2', function(req, res, next) {
//   Favorite.find({})
//   .then(function(favorites) {
//     res.render('kravings/showInfo2', { favorites: favorites } );
//   }, function(err) {
//     return next(err);
//   });

// });


module.exports = router;
