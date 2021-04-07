const mongoose = require('mongoose');
const Movie = require('./movie');
const Customer = require('./customer');

const rentalSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  dateOut: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, required: true }
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
