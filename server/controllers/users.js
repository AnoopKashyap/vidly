const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res, next) => {
	let user = await User.findOne({ email: req.body.email });

	if(user){
	  return res.status(400).send(`User already registered. Please use another email.`);
	}

	const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
  	name: req.body.name,
  	email: req.body.email,
  	password: hashedPassword
  });

  const result = await user.save();

  res.send(_.pick(result, ['name', 'email']));
});

module.exports = router;
