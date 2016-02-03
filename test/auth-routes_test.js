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

  it('should create a new user with a POST requests', (done) => {
    chai.request(baseUri)
      .post('/auth/register')
      .send({"email":"notify@codefellows.com", "password":"password"})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
  });

  it('should check if the user has valid credentials', (done) => {
    chai.request(baseUri)
      .get('/auth/login')
      .auth("notify@codefellows.com", "password")
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
  });
});
