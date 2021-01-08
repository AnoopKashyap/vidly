const mongoose = require('mongoose');
// const Genre = require('./genre');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }, // only with refs
  genre: { type: genreSchema }, // with the whole schema
  numberInStock: { type: Number, required: true },
  dailyRentalRate: { type: Number, required: true }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
