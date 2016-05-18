var express = require('express');
var router = express.Router();

var Favorite = require('../models/fav');

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// Favorites Main Page
router.get('/', authenticate, function(req, res, next) {

  var favorites = global.currentUser.favorites;
    res.render('kravings/showFav', { favorites: favorites, message: req.flash() } );
});

// // Favorites Main Page
// router.get('/', authenticate, function(req, res, next) {
//   Favorite.find({})
//   .then(function(favorites) {
//     res.render('kravings/showFav', { favorites: favorites } );
//   }, function(err) {
//     return next(err);
//   });
// });

// Create Fav
router.post('/', authenticate, function(req, res, next) {
  var favorite = {
    name: req.body.placeName,
    placeID: req.body.placeID,
    kravingName: req.body.kravingName
  };
  currentUser.favorites.push(favorite);
  currentUser.save()
  .then(function() {
    res.redirect('/favs');
  }, function(err) {
    return next(err);
  });
});

// // Create Fav
// router.post('/', function(req, res, next) {
//   var favorite = new Favorite({
//     name: req.body.placeName,
//     placeID: req.body.placeID,
//     kravingName: req.body.kravingName
//   });
//   favorite.save()
//   .then(function(saved) {
//     res.redirect('/favs');
//   }, function(err) {
//     return next(err);
//   });
// });

// Show Favorite List
router.get('/:id', authenticate, function(req, res, next) {
  var favorite = currentUser.favorites.id(req.params.id);
    if (!favorite) return next(makeError(res, 'Document not found', 404));
    res.render('kravings/showInfo2', { favorite: favorite,message: req.flash() });
});

// // Show Favorite List
// router.get('/:id', function(req, res, next) {
//   Favorite.findById(req.params.id)
//   .then(function(favorite) {
//     if (!favorite) return next(makeError(res, 'Document not found', 404));
//     res.render('kravings/showInfo2', { favorite: favorite });
//   }, function(err) {
//     return next(err);
//   });
// });

// Destroy Favorites
router.delete('/:id', authenticate, function(req, res, next) {
  var favorite = currentUser.favorites.id(req.params.id);

if (!favorite) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.favorites.indexOf(favorite);
  currentUser.favorites.splice(index, 1);
  currentUser.save()
    .then(function(saved) {
    res.redirect('/favs');
  }, function(err) {
    return next(err);
  });
});

// // Destroy Favorites
// router.delete('/:id', function(req, res, next) {
//   Favorite.findByIdAndRemove(req.params.id)
//   .then(function() {
//     res.redirect('/favs');
//   }, function(err) {
//     return next(err);
//   });
// });

module.exports = router;
