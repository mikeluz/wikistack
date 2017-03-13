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

wikiRouter.get('/', function(req, res) {
	res.redirect('/');
});

wikiRouter.get('/search', function(req, res) {
  var tags = req.query.tags;
  if (tags) {
    Page.findByTag(tags).then(function(result) {
      console.log(result);
      if (result.length > 0) {
        res.render('tagsearch', {
          tags: result[0].tags
        });
      } else {
        res.render('tagsearch', {
          error: "No matches were found"
        });
      }
    }).catch();
  } else {
    res.render('tagsearch'); 
  }
});

wikiRouter.post('/', function(req, res, next) {
	// 	res.json(req.body);

  var user = User.findOrCreate({where: {
    name: req.body.author_name,
    email: req.body.author_email
  }}).then(function(result) {
    // console.log(result[0].dataValues.id);
    console.log(req.body);
    var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags.split(" "),
        status: req.body.status,
        authorId: result[0].dataValues.id
    }).save().then(function(newPage) {
      res.redirect(newPage.route);
    }).catch(next);
  });
  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback
});

wikiRouter.get('/:urlTitle', function(req, res, next) {
	Page.findOne({
    where: {
        urlTitle: req.params.urlTitle
    },
    include: [
        {model: User, as: 'author'}
    ]
})
.then(function (page) {
    // page instance will have a .author property
    // as a filled in user object ({ name, email })
    if (page === null) {
        res.status(404).send();
    } else {
        res.render('wikipage', {
            page: page
        });
    }
})
.catch(next);
});

module.exports = wikiRouter;
