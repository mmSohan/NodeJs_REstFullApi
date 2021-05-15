const { Genre, validateGenre } = require('../models/genre.model');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
//const {User, validateUser} = require('../models/user.model');
const express = require('express');

//const admin = require('../middleware/admin');
const router = express.Router();


router.get('/',async (req, res, next) => {

    const genres = await Genre.find().sort('name')
    res.send(genres);

});

router.post('/',auth, async (req, res) => {

 const token = req.header('x-auth-token'); 

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{new:true}).lean();

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.delete('/:id',[auth,admin], async (req, res) => {

  const genre = await Genre.findByIdAndRemove(req.params.id).lean();
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid Id.')

  const genre = await Genre.findById(req.params.id).lean();
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});


module.exports = router;