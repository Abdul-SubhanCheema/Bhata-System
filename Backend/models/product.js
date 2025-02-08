const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing spaces
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Price cannot be negative
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Quantity cannot be negative
  },
  category: {
    type: String,
    required: true,
    enum: ["Electronics", "Clothing", "Furniture", "Food", "Other"], // Example categories
    default: "Other",
  },
  status: {
    type: String,
    enum: ["In Stock", "Out of Stock", "Discontinued"],
    default: "In Stock",
  },
  discount: {
    type: Number, // Discount percentage
    default: 0,
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets creation date
  }
});


module.exports = mongoose.model("Product", productSchema);
