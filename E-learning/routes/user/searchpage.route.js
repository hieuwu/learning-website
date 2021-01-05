const express = require('express');
const router = express.Router();
const controller = require('../../controller/search.controller');
router.post('/category', controller.searchbody);
router.get('/category', controller.searchvalue);

module.exports = router;