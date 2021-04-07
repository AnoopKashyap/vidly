const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { User } = require('../models/user');
const { userSchema } = require('../models/user');

router.get('/me', auth, async(req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log("user in auth: ", user);
  if(!user) return res.status(400).send("Invalid username.");

  const result = await bcrypt.compare(req.body.password, user.password);
  if(!result) return res.status(400).send("Invalid password.");

  // const token = user.generateAuthToken();

  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));

  res.header('x-auth-token', token).send(`${user.name} logged in successfully!!`);
});

module.exports = router;
