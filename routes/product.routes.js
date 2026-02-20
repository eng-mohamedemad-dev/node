const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {
	validateCreateProduct,
	validateUpdateProduct
} = require('../middlewares/products/ProductRequest');
const productBinding = require('../middlewares/products/productBinding');

router.param('id', productBinding);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateCreateProduct, productController.createProduct);
router.put('/:id', validateUpdateProduct, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
