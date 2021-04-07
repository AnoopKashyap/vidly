const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const Movie = require('../models/movie');
const Customer = require('../models/customer');

router.get('/', async (req, res, next) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.get('/:id', async (req, res, next) => {
  // try{
    const movie = await Movie.findOne({ title: req.body.movieTitle });
    const customer = await Customer.findOne({ name: req.body.customerName });

    const rental = await Rental.find.and([{ movie: movie._id }, { customer: customer._id }]);
    res.send(`The booked movie by ${customer.name} is ${movie.title}`);
  // }
  // catch(ex){
  //   res.errors(404).send(`Unable to find the booked movie. Please try again!`);
  // }
});

router.post('/', async (req, res, next) => {
  try{
    const movie = await Movie.findOne({ title: req.body.movieTitle });
    const customer = await Customer.findOne({ name: req.body.customerName });

    const rental = new Rental({
      movie: movie._id,
      customer: customer._id,
      dateOut: req.body.bookingDate,
      dateReturned: req.body.returnedDate,
      rentalFee: req.body.ticketFee
    });

    const result = await rental.save();
    res.send(`Ticket for ${movie.title} created successfully in the name of ${customer.name}!!`);
  }
  catch(ex){
    res.errors(500).send(`Unable to create rentals. Inappropriate data from the client.`);
  }
});

module.exports = router;
