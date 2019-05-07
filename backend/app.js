var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var passport = require('passport');
const mongoose = require('mongoose');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var likesRouter = require('./routes/likes');

var app = express();

const port = process.env.PORT || 3000;
const dbPort = process.env.DB_PORT || 27017;
const dbUrl = process.env.DB_URL || "localhost";
const dbCollection = process.env.DB_COLLECTION || "auth-test";

mongoose.connect(`mongodb://${dbUrl}/${dbCollection}`, {useNewUrlParser: true})
    .then(_ => console.log('MongoDB connection success'))
.catch(err => console.error(err));
mongoose.set('useCreateIndex', true);

app.use(passport.initialize());
require('./passport-config')(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', usersRouter);
app.use('/', authRouter);
app.use('/', likesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  return res.status(404).json(err);
});

module.exports = app;
