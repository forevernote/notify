const express = require('express');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();

const PORT = process.env.PORT || 3000;

var app = module.exports = exports = express();
var dbString = process.env.MONGO_URI || 'mongodb://notifyadmin:codefellows401@apollo.modulusmongo.net:27017/G8ynygim';

app.use(express.static(__dirname + '/www'));

mongoose.connect(dbString);

var authRoutes = require(__dirname + '/routes/auth-routes');
var userRoutes = require(__dirname + '/routes/user-routes');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log('Server up on port ' + PORT);
});
