const Product = require('../models/product.model');

// جلب جميع المنتجات
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// جلب منتج واحد بالـ ID
exports.getProductById = async (req, res) => {
  try {
    res.json({ success: true, data: req.product });
  } catch (error) {
    res.status(500).json({ success: false, error: "product not found" });
  }
};

// إضافة منتج جديد
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const newProduct = await Product.create({ name, price, description });
    res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// تحديث منتج
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    req.product.name = name ?? req.product.name;
    req.product.price = price ?? req.product.price;
    req.product.description = description ?? req.product.description;

    await req.product.save();
    res.json({ success: true, message: 'Product updated successfully', data: req.product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// حذف منتج
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await req.product.remove();

    if (!deletedProduct) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
