'use strict';
var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res) {
	Page.findAll({ }).then(function(pages){
		res.render('index', {
			pages: pages,
		});
	});
});

router.get('/users', function(req, res) {
	User.findAll({}).then(function(users) {
		res.render('users', {
      		users: users,
    	});
	});
});

router.get('/users/:id', function(req, res, next) {

	var userPromise = User.findOne({
		where: {
			id: req.params.id
		}
	});

	var pagesPromise = Page.findAll({
		where: {
			authorId: req.params.id
		}
	});

	Promise.all([userPromise, pagesPromise]).then(function(values){
		var user = values[0];
		var pages = values[1];
		res.render('user', {
			user: user,
			pages: pages
		});

	}).catch(next);
});


module.exports = router;
