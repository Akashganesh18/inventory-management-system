const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while fetching products' });
  }
};

// @desc    Create a product
// @route   POST /products
// @access  Public
const createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, minStock } = req.body;
    
    // Validation
    if (!name || !category || price === undefined || quantity === undefined || minStock === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (price < 0 || quantity < 0 || minStock < 0) {
      return res.status(400).json({ success: false, message: 'Numeric fields cannot be negative' });
    }

    const product = await Product.create({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      minStock: Number(minStock)
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while creating product' });
  }
};

// @desc    Update a product
// @route   PUT /products/:id
// @access  Public
const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while updating product' });
  }
};

// @desc    Delete a product
// @route   DELETE /products/:id
// @access  Public
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while deleting product' });
  }
};

// @desc    Get low stock products
// @route   GET /products/low-stock
// @access  Public
const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({ $expr: { $lt: ["$quantity", "$minStock"] } });
    
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while fetching low stock products' });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts
};
