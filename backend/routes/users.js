var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
