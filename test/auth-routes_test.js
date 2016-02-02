var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var mongoose = require('mongoose');
var expect = chai.expect;

const server = require(__dirname + '/../server.js');
const User = require(__dirname + '/../models/user.js');
process.env.MONGOLAB_URI = 'mongodb://notifyadmin:codefellows401@apollo.modulusmongo.net:27017/G8ynygim'
var baseUri = 'localhost:3000';

describe('the authorization route', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  // beforeEach((done) => {
  //   User.create({authentication: [{ email: "notify@fellows.com", password: 'password'}]}, (err, data) => {
  //     console.log(data);
  //     this.testUser = data;
  //     done();
  //   });
  // })
  // afterEach((done) => {
  //   User.remove({});
  //   done();
  // })
  it('should create a new user with a POST requests', (done) => {
    chai.request(baseUri)
      .post('/auth/register')
      .send({"authentication": {"email":"notifyv5@fellows.com", "password":"password1"}})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
  });
});
