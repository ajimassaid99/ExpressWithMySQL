const router = require('express').Router();
const productController = require('./controller'); 
const multer = require('multer');
const upload = multer({dest: '../uploads'});


router.get('/products', productController.getProduct);

router.get('/product/:id', productController.getProductById);

router.post('/product', upload.single('image'),productController.storeProduct);

router.put('/product/:id', upload.single('image'),productController.UpdateProduct);

router.delete('/product/:id', productController.DeletProductById);


module.exports = router;