var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var mongoose = require('mongoose');
var expect = chai.expect;

process.env.MONGO_URI = 'mongodb://notifyadmin:codefellows401@apollo.modulusmongo.net:27017/pY3miror';

const server = require(__dirname + '/../server.js');
const User = require(__dirname + '/../models/user.js');
var baseUri = 'localhost:3000';

describe('the authorization route', () => {
  after((done) => {
    User.remove({}, function(err) {
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

  it('should create a new user with a POST requests', (done) => {
    chai.request(baseUri)
      .post('/auth/register')
      .send({"email":"notifyv11@fellows.com", "password":"password2"})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
  });
});
