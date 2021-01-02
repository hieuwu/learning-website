const express = require('express');
const router = express.Router();
const controller = require('../../controller/courseByCategory.controller');
router.get('/domain/:domainid/category/:categoryId', controller.allByCategory);
router.get('/domain/:id', controller.allByDomain);
module.exports = router;