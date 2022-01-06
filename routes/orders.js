const express = require('express');
const router = express.Router();
const checkAuth = require('../config/check-auth');

const orders_controller = require('../controllers/orders_controller');

router.get('/', orders_controller.list_orders);
router.post('/', checkAuth, orders_controller.create_order);
router.get('/:orderId', orders_controller.get_order);
router.delete('/:orderId', checkAuth, orders_controller.delete_order)

module.exports = router;