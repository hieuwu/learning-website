const express = require('express');
const controller = require('../../controller/cart.controller');
const router = express.Router();

router.get('/', controller.getListCart)

router.post('/add', controller.postAdd);

router.post('/remove', controller.postRemove);

module.exports = router;