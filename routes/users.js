const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controller');

router.post('/signup', users_controller.signUp);
router.post('/signin', users_controller.signIn);

module.exports = router;