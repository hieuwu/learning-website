const express = require('express');
const router = express.Router();
const controller = require('../../controller/teacher.controller');
router.get('/', controller.getTeachHomePage);

module.exports = router;