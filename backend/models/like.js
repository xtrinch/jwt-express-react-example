const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const LikeSchema = new mongoose.Schema({
    liker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

LikeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Like', LikeSchema);
