var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
  const users = await User.find();

  res.status(200).json(users);
});

module.exports = router;
