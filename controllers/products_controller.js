
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