module.exports.list_orders = function(req, res){
    return res.status(200).json({
        messge: "LIST OF PRODUCTS"
    });
}


module.exports.create_order = function(req, res){
    const order = {
        product_id: req.body.p_id,
        product_quantity: req.body.p_qn
    }
    return res.status(200).json({
        order: order,
        messge: "ORDER PLACED"
    });
}

module.exports.get_order = function(req, res){
    return res.status(200).json({
        messge: req.params.orderId
    });
}



