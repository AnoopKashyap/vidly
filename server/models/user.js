const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true,
    minlength: 3,
    maxlength: 255
  },
  email: {
  	type: String,
  	required: true,
  	unique: true,
  	minlength: 5,
  	maxlength: 255
  },
  password: {
  	type: String,
  	required: true,
  	minlength: 5,
  	maxlength: 1024
  }
});

const User = mongoose.model('User', userSchema);

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
};

// userSchema.method('generateAuthToken', function () {
//   const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
//   return token;
// });

exports.User = User;
exports.userSchema = userSchema;
