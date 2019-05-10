var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/most-liked', async function(req, res, next) {

  // handle authentication manually, as we want the API to work in both cases,
  // but to return 'liked' property if logged in
  passport.authenticate('jwt', async function(err, user, info) {
    var match = {}
    if (user) {
      match = {liker: user.id};
    }
    const users = await User.find(
    ).populate({path:'liked', match: match}).populate('likes').sort({'likes': -1});
    res.status(200).json(users);
  })(req, res, next);

});

router.get('/user/:username', async function(req, res, next) {
  const user = await User.findOne({username: req.params.username}).populate('likes');
  res.status(200).json(user);
});

module.exports = router;
