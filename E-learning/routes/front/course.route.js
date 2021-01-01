const express = require('express');
const router = express.Router();
const controller = require('../../controller/courseByCategory.controller');
router.get('/bycat/:id', controller.allByCategory);

module.exports = router;