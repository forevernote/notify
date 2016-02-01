const express = require('express');
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');
const basicHTTP = require(__dirname + '/../lib/basic-http');
const authCheck = require(__dirname + '/../lib/check-token');

const User = require(__dirname + '/../models/user');
const Post = require(__dirname + '/../models/post');

var userRouter = module.exports = exports = express.Router();

userRouter.get('/posts', authCheck, (req, res) => {
  // if we pass authentication, return response
  res.status(200).json({
    msg: 'Authenticated successfully'
  });
})
