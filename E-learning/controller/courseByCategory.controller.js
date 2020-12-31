const courseModel = require('../models/course.model');

module.exports = {
  getCourseById:  (req, res) => {
    // let listOfCourses = await courseModel.getCourseListbyCategory(req.params.id);
    res.render("vwCourse/byCategory", {
      data: "listOfCourses"
    });
  },
};
