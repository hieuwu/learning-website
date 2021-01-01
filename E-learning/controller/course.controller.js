const courseModel = require("../models/course.model");

module.exports = {
  getDetail: async function (req, res) {
    const id = req.params.id;
    const course = await courseModel.single(id);
    if (course === null) {
      return res.redirect("/");
    }
    var date = new Date(course.updatedTime);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var str = day+"/"+month+"/" + year;
    course.updatedTime = str;
    const listCourse = await courseModel.getCourseByIdCategory(course.IdCategory, id);
    res.render("vwCourses/detail", {
      course: course,
      listCourse : listCourse,
    });
  },
};
