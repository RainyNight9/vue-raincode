var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var logger = require('morgan');

var app = express();

//配置静态服务目录
app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(serveStatic(path.join(__dirname, 'dist'), {
    setHeaders: function(res) {
        //开启静态服务的跨域访问
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers'
            , 'Content-Type,Content-Length, ' +
            'Authorization, Accept,X-Requested-With');
        res.header('Access-Control-Allow-Methods'
            , 'PUT,POST,GET,DELETE,OPTIONS');
      }
  }));

app.use(serveStatic(path.join(__dirname, 'public'), {
    setHeaders: function(res) {
        //开启静态服务的跨域访问
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers'
            , 'Content-Type,Content-Length, ' +
            'Authorization, Accept,X-Requested-With');
        res.header('Access-Control-Allow-Methods'
            , 'PUT,POST,GET,DELETE,OPTIONS');
      }
  }));

app.use(serveStatic(path.join(__dirname, 'static'), {
  setHeaders: function(res) {
    //开启静态服务的跨域访问
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers'
      , 'Content-Type,Content-Length, ' +
      'Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods'
      , 'PUT,POST,GET,DELETE,OPTIONS');
  }
}));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.send(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
  res.send(err);

});

module.exports = app;
