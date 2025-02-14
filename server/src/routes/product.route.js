// routes/product.routes.js

const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const  upload = require('../middleware/multer');


router.post('/products', upload.single('image'), productController.createProduct);

router.get('/products', productController.getAllProducts);

router.get('/products/:id', productController.getProductById);

router.put('/products/:id', upload.single('image'), productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
