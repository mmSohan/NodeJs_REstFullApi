const auth = require('../middleware/auth');
const config = require('config')
const jwt = require('jsonwebtoken')
const _ = require('lodash'); //versiom(4.17.4)
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user.model');
const express = require('express');
const { route } = require('./movie');
const router = express.Router();

router.get('/me',auth, async(req,res)=>{
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

 let user = await User.findOne({ email: req.body.email });
 if (user) return res.status(400).send('User Already Registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10); //hashong password
  user.password = await bcrypt.hash(user.password, salt); //hashing pass
  await user.save();


  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;