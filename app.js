var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var carRouter = require('./routes/car');
var robotRouter = require('./routes/robot');
var adminRouter = require('./routes/admin');
var originRouter = require('./routes/origin');
var app = express();

//khai báo & cấu hình body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//khai báo & cấu hình mongoose
var mongoose = require('mongoose');
var uri = "mongodb+srv://mrcuoivakhoc:Do8KPzp2Cc96EXcG@hoanghuy.cgobvov.mongodb.net/toys";
mongoose.set('strictQuery', false);
mongoose.connect(uri)
.then(() => console.log ("Connect to DB succeed !"))
.catch((err) => console.log (err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

                                                                                                                                             
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/car', carRouter);
app.use('/robot', robotRouter);
app.use('/admin', adminRouter);
app.use('/origin', originRouter);


// ... (other imports)

app.use('/car', carRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(process.env.PORT || 3001);

module.exports = app;
