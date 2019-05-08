var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/most-liked', async function(req, res, next) {
  const users = await User.find().populate('likes');
  res.status(200).json(users);
});

router.get('/user/:username', async function(req, res, next) {
  const user = await User.findOne({username: req.params.username}).populate('likes');
  res.status(200).json(user);
});

module.exports = router;
