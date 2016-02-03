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
var userToken;

describe('user routes', () => {
  before((done) => {
    var newUser = new User();
    newUser.authentication.email = 'notify@codefellows.com';
    newUser.hashPassword('password');
    newUser.save( (err, data) => {
      userToken = data.generateToken();
      done();
    });
  });
  after((done) => {
    User.remove({}, function(err) {
      Post.remove({}, function(err) {
        done();
      })
    });
  });
  it('should be able to create a new post', (done) => {
    chai.request(baseUri)
      .post('/user/new')
      .set('token', userToken)
      .send({"title":"test post", "content.text":"test content"})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('Post created');
        expect(res.body).to.have.property('createdPost');
        expect(res.body.createdPost.title).to.eql('test post');
        expect(res.body.createdPost.content.text).to.eql('test content');
        done();
      })
  });
});


// beforeEach((done) => {
  //   User.create({authentication: { email: "notify@fellows.com", password: 'password'}}, (err, data) => {
  //     console.log(data);
  //     this.testUser = data;
  //     done();
  //   });
  // })
