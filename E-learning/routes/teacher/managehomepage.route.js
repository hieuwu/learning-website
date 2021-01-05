const express = require('express');
const router = express.Router();
const controller = require('../../controller/managehomepage.controller');
router.get('/', controller.getLatestCourse);

module.exports = router;