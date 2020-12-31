const express = require('express');
const router = express.Router();
const Customer = require("../models/customer");

router.get('/', async(req, res) => {
  const customers = await Customer.find();
  let customerDetails = [];
  customers.map(customer => {
    customerDetails.push({
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold
    });
  });
  res.send(customerDetails);
});

router.get('/:id', async(req, res) => {
  const customer = await Customer.findById(req.params.id);
  let customerDetails = [];
  customer.map(c => {
    customerDetails.push({
      name: c.name,
      phone: c.phone,
      isGold: c.isGold
    });
  });
  res.send(customerDetails);
});

router.post('/', async(req, res) => {
  const customer = new Customer({
  	name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  const result = await customer.save();
  res.send(`${result.name} created successfully!!`);
});

router.put('/:id', async(req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
	    phone: req.body.phone,
	    isGold: req.body.isGold
    },
    { new: true }
  );

  res.send(`${customer.name} updated successfully!!`);
});

router.delete('/:id', async(req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  res.send(`${customer.name} deleted successfully!!`);
});

module.exports = router;
