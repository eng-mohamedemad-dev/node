const Product = require('../../models/product.model');

module.exports = async function productBinding(req, res, next, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    req.product = product; // هنا عملنا binding
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Invalid product ID'
    });
  }
};