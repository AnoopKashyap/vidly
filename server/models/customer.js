const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  phone: { type: String, required: true, minlength: 5, maxlength: 255 },
  isGold: { type: Boolean, required: true }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
