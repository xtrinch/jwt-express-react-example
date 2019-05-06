var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    res.status(200).json({});
});

module.exports = router;
