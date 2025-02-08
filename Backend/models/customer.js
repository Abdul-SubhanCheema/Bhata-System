const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cnic: {
    type: String,
    required: true,
    unique: true
  },
  address: {
      type: String,
      required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active','Terminated'],
    default: 'Active'
  },
});

module.exports = mongoose.model('Customer', customerSchema);
