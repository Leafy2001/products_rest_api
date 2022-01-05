const Product = require('../models/product');
const Order = require('../models/order');

module.exports.list_orders = async function(req, res){
    try{
        let orders = await Order.find({}).sort('-createdAt');

        let new_orders = orders.map((order) => {
            return {
                product: order.product,
                quantity: order.quantity,
                request:{
                    type: 'GET',
                    url: `http://localhost:8000/api/orders/${order._id}`
                }
            }
        })

        if(new_orders.length === 0){
            return res.status(204).json({
                message: "No Orders Found"
            })
        }

        return res.status(200).json({
            count: new_orders.length,
            orders: nO
        });
    }catch(err){
        return res.status(400).json(err);
    }
}


module.exports.create_order = async function(req, res){
    try{
        let product = await Product.findById(req.body.product_id);
        if(!product){
            return res.status(204).json({
                message: "Ordered product not found..."
            });
        }
        
        let order = await Order.create({
            product: product._id,
            quantity: req.body.order_quantity
        });

        return res.status(200).json(order);
    }catch(err){
        return res.status(400).json({
            message: err
        });
    }
}

module.exports.get_order = async function(req, res){
    try{
        let order = await Order.findById(req.params.orderId);
        if(!order){
            return res.status(204).json({
                message: "Order Not Found"
            })
        }
        return res.status(200).json(order);
    }catch(err){
        return res.status(400).json(err);
    }
}

module.exports.delete = function(req, res){
    
}

