var express = require('express');
var router = express.Router();
const passport = require('passport');
const Like = require('../models/like');
const User = require('../models/user');

router.post('/user/:username/like', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    const errors = {};
    const liker = req.user;
    const likeeUsername = req.params.username;

    if (!likeeUsername) {
        errors.username = 'No username to like supplied';
        return res.status(400).json(errors);
    }

    const likee = await User.findOne({username: likeeUsername});

    if (!likee) {
        errors.username = 'No user with this username exists for you to like';
        return res.status(400).json(errors);
    }

    const existingLike = await Like.findOne({
        liker: liker.id,
        likee: likee.id
    });

    if (existingLike) {
        errors.username = 'You\'ve already liked this person';
        return res.status(400).json(errors);
    }

    const newLike = new Like({
        liker: liker.id,
        likee: likee.id
    });
    newLike.save();

    return res.status(200).json();
});

router.post('/user/:username/unlike', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    const errors = {};
    const liker = req.user;
    const likeeUsername = req.params.username;

    if (!likeeUsername) {
        errors.username = 'No username to unlike supplied';
        return res.status(400).json(errors);
    }

    const likee = await User.findOne({username: likeeUsername});

    if (!likee) {
        errors.username = 'No user with this username exists for you to unlike';
        return res.status(400).json(errors);
    }

    const existingLike = await Like.findOne({
        liker: liker.id,
        likee: likee.id
    });

    if (!existingLike) {
        errors.username = 'Like doesn\'t exist';
        return res.status(400).json(errors);
    }

    existingLike.delete();

    return res.status(200).json();
});

module.exports = router;
