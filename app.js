require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var uglifyJs = require("uglify-js");
var fs = require('fs');
var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
/*require("angular-animate");
require("angular-sanitize");
require("angular-ui-bootstrap");*/

require('./app_api/models/db');
require('./app_api/config/passport'); 


var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server' ,'views'));
app.set('view engine', 'jade');

var appClientFiles = [
  'app_client/app.js',
  'app_client/controllers/home.controller.js', 
  'app_client/controllers/register.controller.js',
  'app_client/services/authentication.service.js',
  'app_client/controllers/login.controller.js',
  'app_client/controllers/navigation.controller.js',
  'app_client/controllers/profile.controller.js',
  'app_client/services/profile.service.js',
  'app_client/services/youtube.service.js',
  'app_client/controllers/youtube.controller.js',
  'app_client/controllers/roomcreation.controller.js',
  'app_client/controllers/roomlisting.controller.js',
  'app_client/services/roomService.service.js',
  'app_client/controllers/room.controller.js',
  'app_client/controllers/editRoom.controller.js',
  'app_client/services/checkLogin.service.js',
  'app_client/controllers/room.controller.js',
  'app_client/controllers/upload.controller.js'
];
var uglified = uglifyJs.minify(appClientFiles, {
  compress: false
});

fs.writeFile('public/angular/tunebox.min.js', uglified.code, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Script generated and saved: tunebox.min.js');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multipart({ uploadDir: 'public/images' }));

app.use(passport.initialize());

app.use('/', routes);
app.use('/api', routesApi);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;