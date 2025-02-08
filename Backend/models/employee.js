const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
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
  salary: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive','Terminated'],
    default: 'Active'
  },
  salaryHistory: [
    {
      month: String, 
      Year:String,
      amount: Number,
      datePaid: { type: Date, default: Date.now },
    },
  ],
  loanHistory: [
    {
      month: String, // Example: "January 2024"
      amount: Number,
      dateIssued:{ type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Employee', employeeSchema);
