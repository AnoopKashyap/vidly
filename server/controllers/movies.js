const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', async(req, res, next) => {
  const movies = await Movie.find();
  console.log("origin", req.headers.origin);
  res.send(movies);
});

router.get('/:id', async(req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  console.log(`movies ${movie.title}`);
  res.send(movie);
});

router.post('/', async(req, res, next) => {
	const genre = await Genre.findOne({ name: req.body.genre });

	if(!genre){
		res.error(404).send(`Genre not found.`);
		return;
	}

  const movie = new Movie({
    title: req.body.title,
	  genre: { _id: genre._id, name: genre.name },
	  numberInStock: req.body.numberInStock,
	  dailyRentalRate: req.body.dailyRentalRate
  });

  const result = await movie.save();
  res.send(`${result.title} created successfully!!`);
});

router.put('/:id', async(req, res, next) => {
	const genre = await Genre.findOne({ name: req.body.genre });
	if(!genre){
		res.error(404).send(`Genre not found.`);
		return;
	}

  const movie = await Movie.findByIdAndUpdate({
  	title: req.body.title,
	  genre: genreId,
	  numberInStock: req.body.numberInStock,
	  dailyRentalRate: req.body.dailyRentalRate
  });

  res.send(`${movie.name} updated successfully!!`);
});

router.delete('/:id', async(req, res, next) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  res.send(`${movie} deleted successfully!!`);
});

router.delete('/', async(req, res, next) => {
  const result = await Movie.deleteMany({ title: 'Terminator' });
  res.send(`Deleted all the collections in the database`);
});

module.exports = router;
