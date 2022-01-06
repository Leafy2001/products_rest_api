const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path');
const checkAuth = require('../config/check-auth');

const PRODUCT_PATH = path.join(__dirname, '..', '/uploads/products');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, PRODUCT_PATH)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}

const upload = multer({ storage: storage, limits: {
  fileSize: 1024*1024*2
}, fileFilter: fileFilter });

const products_controller = require('../controllers/products_controller');

router.get('/', products_controller.list_products);
router.get('/:productId', products_controller.get_product);

router.post('/', checkAuth, upload.single('product_image'), products_controller.create_product);
router.patch('/:productId', checkAuth, upload.single('product_image'), products_controller.update_product);

router.delete('/:productId', checkAuth, products_controller.delete_product);

module.exports = router;