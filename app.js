const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./app_server/routes');
const apiRouter = require('./app_api/routes');

require('./app_api/models');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).send('Could not find resource');
  next();
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  return res.status(500).send('Server error');
});

module.exports = app;
