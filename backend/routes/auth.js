var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'some other secret as default';
const passport = require('passport');

router.post('/signup', async (req, res) => {
    var errors = {};
    const user = await User.findOne({username: req.body.username});

    const newUser = new User({...req.body});

    try {
        await newUser.save();
    } catch(e) {
        errors = e;
        return res.status(400).json(e);
    }

    return res.status(200).json({});
});

router.post('/login', async (req, res) => {
    const errors = {};
    const username = req.body.username
    const password = req.body.password;
    const user = await User.findOne({ username }).select("+password");

    // return if there was no user with this username found in the database
    if (!user) {
        errors.message = "No Account Found";
        return res.status(400).json(errors);
    }

    isMatch = await bcrypt.compare(password, user.password);

    // return 400 if password does not match
    if (!isMatch) {
        errors.message = "Password is incorrect";
        return res.status(400).json(errors);
    }

    const payload = {
        id: user._id,
        username: user.username
    };

    token = await jwt.sign(payload, secret, { expiresIn: 36000 });

    // return 500 if token is incorrect
    if (!token) {
        return res.status(500)
            .json({ error: "Error signing token",
                raw: err });
    }

    return res.json({
        success: true,
        token: `Bearer ${token}` });
});

router.get('/me', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    const username = req.user.username;
    const dbUser = await User.findOne({ username });
    res.status(200).json(dbUser);
});

router.post('/me/update-password', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    const username = req.user.username;
    const dbUser = await User.findOne({ username });
    dbUser.password = req.body.password;
    console.log(dbUser.password)
    await dbUser.save();

    res.status(200).json();
});

module.exports = router;
