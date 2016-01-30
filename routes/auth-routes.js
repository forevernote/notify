const express = require('express');
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');

const User = require(__dirname + '/../models/user');

var authRouter = module.exports = exports = express.Router();

// Create new User
authRouter.post('/register', jsonParser, (req, res) => {
  // Check email and password length
  if(!((req.body.email || "").length && (req.body.password || "").length > 7)) {
    return res.status(400).json({
      msg: 'Email or password not long enough'
    })
  }

  // Check if user is already in database
  User.findOne({'authentication.email': req.body.email}, (err, user) => {
    // Check for DB Error
    if(err) {
      return res.status(500).json({
        msg: 'DB Error'
      })
    }
    // Check if user is populated (exists)
    if(user) {
      return res.status(500).json({
        msg: 'User already Exists'
      })
    }

    var newUser = new User();
    newUser.authentication.email = req.body.email;
    newUser.hashPassword(req.body.password);
    newUser.save( (err, data) => {
      if(err || !data) {
        return res.status(500).json({
          msg: 'Error creating user'
        });
      }
      res.status(200).json({
        token: data.generateToken(),
        data: data
      })
    });
  });
});
