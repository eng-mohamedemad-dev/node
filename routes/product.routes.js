const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {
	validateCreateProduct,
	validateUpdateProduct
} = require('../middlewares/products/ProductRequest');
const Product = require('../models/product.model');

const resource = require('../utils/resource');

resource(router, 'products', productController, Product);



module.exports = router;
