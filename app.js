'use strict'
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');

// routers
var routes = require('./routes');
var wikiRouter = require('./routes/wiki');

// var fs = require('fs');
var path = require('path');
// var mime = require('mime');
var bodyParser = require('body-parser');
var models = require('./models');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
var env = nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// static and dynamic routing
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes);
app.use('/wiki', wikiRouter);

// sync with database
models.User.sync({ force: false })
.then(function () {
    return models.Page.sync({ force: false })
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000');
    });
})
.catch(console.error);
