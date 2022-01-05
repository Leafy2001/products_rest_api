const Product = require('../models/product.js');

const path = require('path');
const fs = require('fs');

module.exports.list_products = async function(req, res){
    try{
        let products = await Product.find({}).select('name price product_image');

        let newProducts = products.map((product) => {
            return {
                _id : product._id,
                name: product.name, 
                price: product.price,
                product_image: product.product_image,
                info: {
                    type: 'GET',
                    url: `http://localhost:8000/api/products/${product._id}`
                }
            }
        })
        
        let response = {
            count: products.length,
            products: newProducts
        }
        if(response.count === 0){
            return res.status(204).json({
                message: "No products Available",
                response: response
            })
        }
        return res.status(200).json(response);
    }catch(err){
        return res.status(400).json({
            message: err
        });
    }
};

module.exports.get_product = async function(req, res){
    try{
        let product = await Product.findById(req.params.productId);
        if(product){
            return res.status(200).json({
                product: product
            });
        }else{
            return res.status(200).json({
                message: "No Product Found"
            });
        }
    }catch(err){
        return res.status(400).json({
            message: err
        });
    }
}

module.exports.create_product = async function(req, res){
    try{
        // console.log(req.body, req.file);
        let file_path;
        if(req.file){
            file_path = path.join('/uploads/products/', req.file.filename);
        }

        let product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            product_image: file_path
        })
        return res.status(201).json({
            product: product,
            request: {
                type: 'GET',
                url: `http://localhost:8000/api/products/${product._id}`
            },
            message: "PRODUCT CREATED"
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({
            error_message: err
        })
    };
};

module.exports.delete_product = async function(req, res){
    try{
        let product = await Product.findById(req.params.productId);
        if(!product){
            return res.status(200).json({
                message: "PRODUCT NOT FOUND"
            })
        }
        if(product.product_image){
            let file_path = path.join(__dirname, '..', product.product_image);
            fs.unlinkSync(file_path, (err) => {
                console.log(err);
            });
        }
        await Product.deleteOne({id: req.params.productId});
        return res.status(200).json({
            message: `PRODUCT with ${req.params.productId} successfully deleted`
        });
    }catch(err){
        return res.status(400).json({
            message: err
        });
    }
}

module.exports.update_product = async function(req, res){
    try{
        let prod_id = req.params.productId;
        let product = await Product.findById(prod_id);
        if(!product){
            return res.status(200).json({
                message: "Product Not Found"
            });
        }
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;

        if(req.file){
            if(product.product_image && fs.existsSync(path.join(__dirname, '..', product.product_image))){
                let file_path = path.join(__dirname, '..', product.product_image);
                fs.unlinkSync(file_path, (err) => {
                    console.log(err);
                });
            }
            product.product_image = path.join('/uploads/products/', req.file.filename);
        }

        await product.save();

        return res.status(200).json({
            product: product,
            message: "Product Successfully Updated"
        });
    }catch(err){
        return res.status(400).json(err);
    }
}
