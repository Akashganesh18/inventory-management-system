const express = require('express');
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
} = require('../controllers/productController');

// Important: Put specific routes before dynamic routes (like /:id)
router.route('/low-stock').get(getLowStockProducts);

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;