const Product = require('./model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = multer({dest: '../uploads'});

const storeProduct = async (req,res) =>{
    const {user_id,name,price,stock,status} =req.body;
    const image = req.file;
    if(image){  
        const target = path.join(__dirname, '../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try{
            await Product.sync();
            const result = await Product.create({user_id,name,price,stock,status,image_url:`http://localhost:3000/uploads/${image.originalname}`});
            res.send(result);
        }catch(error){
            res.send(error);
        }
    }else{
        console.log('Gagal');
        res.send({status:"Gagal"})
    }
}

const getProduct = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.send(products);
    } catch (error) {
      res.send(error);
    }
  }

const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findByPk(productId);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    } catch (error) {
      res.send(error);
    }
  }

const UpdateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if(image){  
        const target = path.join(__dirname, '../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
        const product = await Product.findByPk(productId);
        if (product) {
            product.name = name;
            product.price = price;
            product.stock = stock;
            product.status = status;
            product.image_url = `http://localhost:3000/uploads/${image.originalname}`;
    
            await product.save();
    
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
        } catch (error) {
        res.send(error);
        }
    }
  } 

const DeletProductById = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findByPk(productId);
      if (product) {
        // Delete the product
        await product.destroy();
        res.send({ message: 'Product deleted successfully' });
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    } catch (error) {
      res.send(error);
    }
  }

module.exports = {
    storeProduct,
    getProduct,
    getProductById,
    UpdateProduct,
    DeletProductById
}