const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = multer({dest: '../uploads'});
const productController = require('./controller');

router.post('/product', upload.single('image'),productController.storeProduct);

router.get('/products',productController.getProduct);

router.get('/product/:id',productController.getProductById);

router.put('/product/:id',upload.single('image'),productController.UpdateProduct);

router.delete('/product/:id',productController.DeletProductById);

module.exports = router;