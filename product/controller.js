const connection = require('../config/mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = multer({dest: '../uploads'});


const getProduct = (req, res) => {
    const {search}=req.query;
    if(search){
        connection.query({
            sql: 'SELECT * FROM products where name like ?',
            values:[`%${search}%`]
        },_response(res));
    }else{
        connection.query({
            sql: 'SELECT * FROM products'
        },_response(res));
    }
}

const getProductById = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM products where id = ?',
        values:[req.params.id]
    },_response(res));
}

const DeletProductById = (req, res) => {
    connection.query({
        sql: 'DELETE FROM products where id = ?',
        values:[req.params.id]
    },_response(res));
}

const storeProduct = (req, res) => {
    const {user_id,name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
    const target = path.join(__dirname, '../uploads', image.originalname);
    fs.renameSync(image.path, target);
    connection.query({
        sql:'INSERT INTO products (user_id,name, price, stock, status, image_url) VALUES (?,?, ?, ?, ?, ?)',
        values:[user_id,name, price, stock, status, `http://localhost:3000/uploads/${image.originalname}`],
      },_response(res));
    }
}

const UpdateProduct = (req, res) => {
    const {user_id,name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
    const target = path.join(__dirname, '../uploads', image.originalname);
    fs.renameSync(req.file.path, target);
    connection.query({
        sql: 'UPDATE products SET user_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?',
        values: [user_id, name, price, stock, status, target, req.params.id],
      },_response(res));
    }
}


const _response = (res) => {
    return (error,result)=> {
        if(error){
            res.send({
                status:'failed',
                response: error
            });
        }else{
            res.send(
            {
                status: 'succes',
                response: result
            }
        );
    }
    }
}

module.exports = {
    getProduct,
    getProductById,
    storeProduct,
    UpdateProduct,
    DeletProductById
}