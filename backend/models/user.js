const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength:1,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
});

UserSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'likee',
    count: true,
});

UserSchema.set('toJSON', {
    virtuals: true
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) {
        console.log("User password not modified");
        return next();
    } else {
        console.log("User password IS modified");
    }

    bcrypt
        .genSalt(12)
        .then((salt) => {
            return bcrypt.hash(user.password, salt);
        })
        .then((hash) => {
            user.password = hash;
            console.log("Hashing")
            next();
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

UserSchema.methods.comparePassword = (candidatePassword, next) => {
    bcrypt.compare(candidatePassword, this.password,function(err, isMatch){
        if(err) return next(err);
        next(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema);
