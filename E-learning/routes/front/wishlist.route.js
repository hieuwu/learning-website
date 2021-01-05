const express = require('express');
const controller = require('../../controller/wishlist.controller');
const router = express.Router();

router.post('/add', controller.postAdd);

router.post('/remove', controller.postRemove);

module.exports = router;