const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      subtotal: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Online"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  amountPaid: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  pendingAmount: { 
    type: Number, 
    required: true, 
    default: function() { 
      return this.finalAmount - this.amountPaid; 
    } 
  },
});

billSchema.pre('save', function(next) {
  this.pendingAmount = this.finalAmount - this.amountPaid;
  next();
});

module.exports = mongoose.model("Bill", billSchema);
