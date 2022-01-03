const express = require('express');
const router = express.Router();

const orders_controller = require('../controllers/orders_controller');

router.get('/', orders_controller.list_orders);
router.post('/', orders_controller.create_order);
router.get('/:orderId', orders_controller.get_order);

module.exports = router;