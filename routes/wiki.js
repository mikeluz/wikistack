'use strict';
var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


wikiRouter.post('/', function(req, res, next) {
	// 	res.json(req.body);
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
		status: req.body.status
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
  res.redirect('/');
});

wikiRouter.get('/', function(req, res) {
	// res.send("Working GET ALL");
	res.redirect("/");
});


wikiRouter.get('/add', function(req, res) {
	// res.send("Working ADD GET");
	res.render('addpage');
});

module.exports = wikiRouter;
