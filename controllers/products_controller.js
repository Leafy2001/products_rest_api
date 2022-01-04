const Product = require('../models/product.js');

module.exports.list_products = async function(req, res){
    try{
        let products = await Product.find({});
        return res.status(200).json({
            products: products
        });
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
        let product = await Product.create({
            name: req.body.name,
            price: req.body.price
        })
        return res.status(200).json({
            product: product,
            message: "PRODUCT CREATED"
        });
    }catch(err){
        return res.status(400).json({
            error_message: err
        })
    };
};

module.exports.delete_product = async function(req, res){
    try{
        let product = await Product.findById(req.params.productId);
        if(!product){
            return res.status(400).json({
                message: "PRODUCT NOT FOUND"
            })
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
