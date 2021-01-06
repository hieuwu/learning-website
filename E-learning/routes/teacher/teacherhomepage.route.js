const express = require('express');
const router = express.Router();
const controller = require('../../controller/teacher/homepage.controller');
router.get('/', controller.getHomePage);
module.exports = router;