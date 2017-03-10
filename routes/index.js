'use strict';
var express = require('express');
var router = express.Router();
var client = require('../db/index');

router.get('/', function(req, res) {
	console.log('hello');
	res.render('index');
	// res.render('index', { title: title });
});

module.exports = router;