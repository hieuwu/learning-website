const express = require('express');
const router = express.Router();
const controller = require('../../controller/account.controller');
router.get('/register', controller.getRegister);
module.exports = router;