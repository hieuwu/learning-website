const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/admin.controller');
router.get('/', controller.getadminHome);
router.get('/course/all', controller.getAllCourse);
router.delete('/course/:id', controller.deleteCourse);
router.get('/course/detail/:id', controller.getCourseDetail);
router.get('/course/edit/:id', controller.getEditCoursePage);
router.post('/course/edit/:id', controller.editCourse);
router.get('/category/all', controller.getCategoryPage);
router.get('/category/edit/:id', controller.getEditCategoryPage);

module.exports = router;