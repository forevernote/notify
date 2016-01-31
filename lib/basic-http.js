const zeroBuffer = require(__dirname + '/zero-buffer');

module.exports = exports = function(req, res, next) {
  try {
    var authString = req.headers.authorization;
    console.log('1');
    console.log(authString);
    var base64String = authString.split(' ')[1];
    console.log('2');
    console.log(base64String);
    var authBuf = new Buffer(base64String, 'base64');
    console.log('3');
    console.log(authBuf);
    var utf8AuthString = authBuf.toString();
    console.log('4');
    console.log(utf8AuthString);
    var authArr = utf8AuthString.split(':');
    console.log('5');
    console.log(authArr);
    zeroBuffer(authBuf);
    if (authArr[0].length && authArr[1].length) {
      req.basicHTTP = {
        email: authArr[0],
        password: authArr[1]
      };

      return next();
    }
  } catch (e) {
    console.log(e);
  }
  res.status(401).json({
    msg: 'Error, could not log in'
  });
};
