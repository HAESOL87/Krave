var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Krave.' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about');
>>>>>>> d328d66203f0c986f892819f4edb1370d788708b
});

module.exports = router;
