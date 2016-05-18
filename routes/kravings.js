var express = require('express');
var router = express.Router();

var Kraving = require('../models/kraving');

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

// Index - get all kravings and render kravings list view
router.get('/', authenticate, function(req, res, next) {
  var kravings = global.currentUser.kravings;
  res.render('kravings/index', { kravings: kravings, message: req.flash() } );
});

// New Kraving
router.get('/new', authenticate, function(req, res, next) {
  var kraving = {
    name: '',
    city: '',
    state: '',
    zip: ''
  };
  res.render('kravings/new', { kraving: kraving, message: req.flash() } );
});

// Show Global Map
router.get('/:id', authenticate, function(req, res, next) {
  var kraving = currentUser.kravings.id(req.params.id);
    if (!kraving) return next(makeError(res, 'Document not found', 404));
    res.render('kravings/showGlobalMap', { kraving: kraving, message: req.flash()});
});

// Show Info
router.get('/:kraving/info/:place', authenticate, function(req, res, next) {
  var kraving = currentUser.kravings.id(req.params.kraving);
  if (!kraving) return next(makeError(res, 'Document not found', 404));
    res.render('kravings/showInfo', { kraving: kraving, currentPlaceId: req.params.place, message: req.flash()});
});

// Create Kraving
router.post('/', authenticate, function(req, res, next) {
  var kraving = {
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  };
  currentUser.kravings.push(kraving);
  currentUser.save()
  .then(function() {
    res.redirect('/kravings');
  }, function(err) {
    return next(err);
  });
});

// Edit Kraving
router.get('/:id/edit', authenticate, function(req, res, next) {
    var kraving = currentUser.kravings.id(req.params.id);
    if (!kraving) return next(makeError(res, 'Document not found', 404));
    res.render('kravings/edit', { kraving: kraving, message: req.flash() });
});

// Update Kraving
router.put('/:id', authenticate, function(req, res, next) {
  var kraving = currentUser.kravings.id(req.params.id);
    if (!kraving) return next(makeError(res, 'Document not found', 404));
    else {
    kraving.name = req.body.name;
    kraving.city = req.body.city;
    kraving.state = req.body.state;
    kraving.zip = req.body.zip;
    currentUser.save()
  .then(function(saved) {
    res.redirect('/kravings');
  }, function(err) {
    return next(err);
  });
}
});

// Destroy Kraving
router.delete('/:id', authenticate, function(req, res, next) {
  var kraving = currentUser.kravings.id(req.params.id);

  if (!kraving) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.kravings.indexOf(kraving);
  currentUser.kravings.splice(index, 1);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/kravings');
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
