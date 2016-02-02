const express = require('express');
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');
const basicHTTP = require(__dirname + '/../lib/basic-http');
const authCheck = require(__dirname + '/../lib/check-token');

const User = require(__dirname + '/../models/user');
const Post = require(__dirname + '/../models/post');

var userRouter = module.exports = exports = express.Router();


userRouter.get('/posts', authCheck, (req, res) => {
	Post.find({author_id: req.user._id}, (err, data) => {
		if(err) {
			return res.status(500).json({
				msg: 'Error finding posts'
			})
		} 

		res.status(200).json({
			msg: 'All post retrieved',
			posts: data
		});
	});
});

userRouter.post('/new', authCheck, jsonParser, (req, res) => {
	
})