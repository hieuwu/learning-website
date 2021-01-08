const express = require('express');
const router = express.Router();
const controller = require('../../controller/teacher/teacher.controller');
const auth = require('../../middlewares/auth.mdw');
router.get('/', controller.getHomePage);
module.exports = router;