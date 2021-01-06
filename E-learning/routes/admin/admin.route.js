const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin.controller');
router.get('/', controller.getadminHome);
router.get('/course/all', controller.getAllCourse);
router.get('/course/:id', controller.deleteCourse);

module.exports = router;