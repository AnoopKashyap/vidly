const express = require('express');
const router = express.Router();
const Genre = require("../models/genre");

router.get('/', async(req, res) => {
  const genres = await Genre.find();
  var genreNames = [];
  genres.map(genre =>{
    genreNames.push({ name: genre.name });
  });
  res.send(genreNames);
});

router.get('/:id', async(req, res) => {
  const genre = await Genre.findById(req.params.id);
  if(!genre) res.status(404).send('No genre of that id found!');
  else res.send(genre.name);
});

router.post('/', async(req, res) => {
  const genre = new Genre({
    name: req.body.name
  });

  const result = await genre.save();
	res.send(`${result.name} added successfully!!`);
});

router.put('/:id', async(req, res) => {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.send(`${genre.name} updated successfully!!`);
});

router.delete('/:id', async(req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  res.send(`${req.params.id} deleted successfully!!`);
});

module.exports = router;
