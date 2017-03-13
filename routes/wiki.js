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

wikiRouter.post('/', function(req, res, next) {
	// 	res.json(req.body);

  var user = User.findOrCreate({where: {
    name: req.body.author_name,
    email: req.body.author_email
  }}).then(function(result) {
    // console.log(result[0].dataValues.id);
    var page = Page.build({
        title: req.body.title,
        content: req.body.content,
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
  // // res.send("Working GET ALL");
  // var onePage = Page.findOne({
  //   where: {
  //     urlTitle: req.params.urlTitle
  //   }
  // })
	//
	// var author = onePage.then(function(value){
	// 	// console.log("valueid", value.id)
	// 	return User.findOne({
	// 		where: {
	// 			id: value.id
	// 		}
	// 	})
	// }).then(function(value){
	// 	console.log(value)
	// 	// console.log(author)
	// })
	//
	// console.log(onePage)
	// console.log(author)
	// // Promise.all([onePage, author]).then(function(values){
	// 	page = values[0];
	// 	user = values[1];
	// }).catch(next);


	// .then(function(page) {
  //   // res.json(page);
	// 	res.render('wikipage', {
	// 		page: page,
	// 		title: page.title,
	// 		urlTitle: page.urlTitle,
	// 		content: page.content
	// 	});
  // }).catch(next);

  // res.send(req.params.urlTitle);
  // res.redirect("/");
});

module.exports = wikiRouter;
