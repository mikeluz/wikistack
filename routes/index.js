'use strict';
var express = require('express');
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

router.get('/users/:id', function(req, res, next) {
    User.findOne({ 
      where: {
        id: req.params.id
      }
    }).then(function(users) {
    // res.json(page);
	    res.render('users', {
	      users: users
	    });
  	}).catch(next);
  }
);

router.get('/users', function(req, res) {
	User.findAll({}).then(function(users) {
		res.render('users', {
      		users: users,
    	}); 
	});
});

module.exports = router;
