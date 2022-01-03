const express = require('express');
const router = express.Router();

const products_controller = require('../controllers/products_controller');

router.get('/', products_controller.list_products);
router.get('/:productId', products_controller.get_product);

module.exports = router;