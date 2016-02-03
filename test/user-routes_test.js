var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var mongoose = require('mongoose');
var expect = chai.expect;

process.env.MONGO_URI = 'mongodb://notifyadmin:codefellows401@apollo.modulusmongo.net:27017/pY3miror';

const server = require(__dirname + '/../server.js');
const User = require(__dirname + '/../models/user.js');
const Post = require(__dirname + '/../models/post.js');
var baseUri = 'localhost:3000';

describe('user routes', () => {
  after((done) => {
    Post.remove({}, function(err) {
      done();
    });
  });



// beforeEach((done) => {
  //   User.create({authentication: { email: "notify@fellows.com", password: 'password'}}, (err, data) => {
  //     console.log(data);
  //     this.testUser = data;
  //     done();
  //   });
  // })
