const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please add the quantity'],
  },
  minStock: {
    type: Number,
    required: [true, 'Please add the minimum stock level'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
