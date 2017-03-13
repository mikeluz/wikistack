'use strict';
var express = require('express');
var wikiRouter = express.Router();
var client = require('../db/index');

wikiRouter.get('/', function(req, res) {
	// res.send("Working GET ALL");
	res.redirect("/");
});

wikiRouter.post('/', function(req, res) {
	// res.send("Working POST");
	// console.log
	res.json(req.body);
});

wikiRouter.get('/add', function(req, res) {
	// res.send("Working ADD GET");
	res.render('addpage');
});

module.exports = wikiRouter;