const Joi = require('joi'); //for validation
const _ = require('lodash'); //versiom(4.17.4)
const bcrypt = require('bcrypt'); //for hashing pass
const {User} = require('../models/user.model');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
   let user = await User.findOne({email: req.body.email});
   if (!user) return res.status(400).send('Invalid email or password.');

   const match = await bcrypt.compare(req.body.password, user.password);
   if(!match) return res.status(400).send('Invalid email or password.');
   
   const token = user.generateAuthToken();
   
   res.send(token);
  });

  function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

  module.exports = router;