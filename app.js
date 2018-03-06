var express = require("express");
var path = require("path");
var ejs = require("ejs");
var logger = require('morgan');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var api = require('./routes/api');
var index = require('./routes/index');

var app = express();

port = process.env.port || 3000;
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');//这两句设置模板引擎为html

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, function () {
    console.log(`正在监听${port}端口`);
});

module.exports = app;