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
	})
});

module.exports = router;
