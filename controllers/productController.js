const Product = require('../models/product.model');

// GET /products
exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.json({
      success: true,
      count: products.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /products/:id  (binding auto)
exports.show = async (req, res) => {
  res.json({ success: true, data: req.product });
};

// POST /products
exports.store = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const newProduct = await Product.create({ name, price, description });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /products/:id
exports.update = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    req.product.name = name ?? req.product.name;
    req.product.price = price ?? req.product.price;
    req.product.description = description ?? req.product.description;

    await req.product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: req.product
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE /products/:id
exports.destroy = async (req, res) => {
  try {

    await req.product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};