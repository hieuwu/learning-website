const express = require('express');
const controller = require('../../controller/course.controller');
const router = express.Router();
router.get('/detail/:id', controller.getDetail)
module.exports = router;