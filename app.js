var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var localStorage=require('local-storage');
var dotenv= require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var centerRouter = require('./routes/center');
var pdRouter = require('./routes/pd');

dotenv.config({path:'./.env'});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: Date.now() + (30 * 86400 * 1000)  }}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.locals.type = req.session.type;
  console.log("app.js",req.session.type,res.locals.type)
  res.locals.user_id = req.session.user_id;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/center', centerRouter);
app.use('/pd', pdRouter);




// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



const db = require("./models");
db.sequelize.sync();

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = app;
