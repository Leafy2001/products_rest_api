
module.exports.list_products = function(req, res){
    return res.status(200).json({
        message: "PRODUCTS GET ROUTE"
    })
};

module.exports.get_product = function(req, res){
    return res.status(200).json({
        message: req.params.productId
    })
}

module.exports.create_product = function(req, res){
    const product = {
        name: req.body.p_name,
        price: req.body.p_price
    };
    console.log(product);
    return res.status(200).json({
        product: product,
        message: "PRODUCT CREATED"
    })
}