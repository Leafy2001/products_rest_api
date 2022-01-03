module.exports.list_orders = function(req, res){
    return res.status(200).json({
        messge: "LIST OF PRODUCTS"
    });
}


module.exports.create_order = function(req, res){
    return res.status(200).json({
        messge: "PRODUCT CREATED"
    });
}

module.exports.get_order = function(req, res){
    return res.status(200).json({
        messge: req.params.orderId
    });
}



