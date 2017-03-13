'use strict';
var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/add', function(req, res) {
	// res.send("Working ADD GET");
	res.render('addpage');
});

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
  page.save().then(function(newPage) {
      res.redirect(newPage.route);
  }).catch(next);

});

wikiRouter.get('/:urlTitle', function(req, res, next) {
  // res.send("Working GET ALL");
  Page.findOne({ // Page.findOne
    where: {
      urlTitle: req.params.urlTitle
    }
  }).then(function(page) {
    // res.json(page);
		res.render('wikipage', {
			page: page,
			title: page.title,
			urlTitle: page.urlTitle,
			content: page.content
		});
  }).catch(next);

  // res.send(req.params.urlTitle);
  // res.redirect("/");
});

module.exports = wikiRouter;
