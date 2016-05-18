var express = require('express');
var router = express.Router();

var Kraving = require('../models/kraving');
var Favorite = require('../models/fav');


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// Index - get all kravings and render kravings list view
router.get('/', function(req, res, next) {
  Kraving.find({})
  .then(function(kravings) {
    res.render('kravings/index', { kravings: kravings } );
  }, function(err) {
    return next(err);
  });
});

// New Kraving
router.get('/new', function(req, res, next) {
  var kraving = {
    name: '',
    city: '',
    state: '',
    zip: ''
  };
  res.render('kravings/new', { kraving: kraving } );
});

// Show Global Map
router.get('/:id', function(req, res, next) {
  Kraving.findById(req.params.id)
  .then(function(kraving) {
    if (!kraving) return next(makeError(res, 'Document not found', 404));
    res.render('kravings/showGlobalMap', { kraving: kraving});
  }, function(err) {
    return next(err);
  });
});

// Show Info
router.get('/:id/info', function(req, res, next) {
  console.log("I'm here!")
  Kraving.findById(req.params.id)
  .then(function(kraving) {
    if (!kraving) return next(makeError(res, 'Document not found', 404));
    res.render('kravings/showInfo', { kraving: kraving});
  }, function(err) {
    return next(err);
  });
});

// Update Info
router.put('/:id/info', function(req, res, next) {
  Kraving.findById(req.params.id)
  .then(function(kraving) {
    if (!kraving) return(makeError(res, 'Document not found', 404));
    console.log(req.body.place1);
    kraving.placeid = req.body.place1;
    return kraving.save();
  })
  .then(function(saved) {
    res.redirect('/kravings/' + saved._id + '/info');
  }, function(err) {
    return next(err);
  });
});

// Create Kraving
router.post('/', function(req, res, next) {
  var kraving = new Kraving({
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  });
  kraving.save()
  .then(function(saved) {
    res.redirect('/kravings');
  }, function(err) {
    return next(err);
  });
});

// Edit Kraving
router.get('/:id/edit', function(req, res, next) {
  Kraving.findById(req.params.id)
  .then(function(kraving) {
    if (!kraving) return next(makeError(res, 'Document not found', 404));
    res.render('kravings/edit', { kraving: kraving });
  }, function(err) {
    return next(err);
  });
});


// // Update Kraving
// router.put('/:id', function(req, res, next) {
//   Kraving.findById(req.params.id)
//   .then(function(kravings) {
//     if (!kraving) return(makeError(res, 'Document not found', 404));
//     kraving.name = req.body.name;
//     kraving.city = req.body.city;
//     kraving.state = req.body.state;
//     kraving.zip = req.body.zip;
//     return kraving.save();
//   })
//   .then(function(saved) {
//     res.redirect('/kravings');
//   }, function(err) {
//     return next(err);
//   });
// });

// Destroy Kraving
router.delete('/:id', function(req, res, next) {
  Kraving.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/kravings');
  }, function(err) {
    return next(err);
  });
});

// Toggle Favorite

module.exports = router;
