const express = require('express');
const router = express.Router();
const controller = require('../../controller/courseByCategory.controller');
router.get('/bycat', controller.getCourseById);

module.exports = router;