const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin.controller');
router.get('/', controller.getadminHome);

module.exports = router;