const express = require('express');
const router = express.Router();
const controller = require('../../controller/homepage.controller');
router.get('/', controller.getLatestCourse);

module.exports = router;