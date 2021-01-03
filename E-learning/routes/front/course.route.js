const express = require('express');

const router = express.Router();
const controllerByCategory = require('../../controller/courseByCategory.controller');
const controller = require('../../controller/course.controller');
router.get('/domain/:domainid/category/:categoryId', controllerByCategory.allByCategory);
router.get('/domain/:id', controllerByCategory.allByDomain);
router.get('/detail/:id', controller.getDetail)

module.exports = router;