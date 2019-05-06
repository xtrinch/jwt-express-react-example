var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'some other secret as default';

router.post('/register', (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if(user){
                let error = 'User already exists.';
                return res.status(400).json(error);
            } else {
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                });
                newUser.save();
                return res.status(200).json('OK');
            }
        });
});

router.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username })
        .then(user => {
            if (!user) {
                errors.username = "No Account Found";
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user._id,
                            username: user.username
                        };
                        jwt.sign(payload, secret, { expiresIn: 36000 },
                            (err, token) => {
                                if (err) res.status(500)
                                    .json({ error: "Error signing token",
                                        raw: err });
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}` });
                            });
                    } else {
                        errors.password = "Password is incorrect";
                        res.status(400).json(errors);
                    }
                });
        });
});

module.exports = router;
