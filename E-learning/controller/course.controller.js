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
    const listRating = await courseModel.getListRating(id);
    let isAvailableAddCart = false;
    for (const IdCourse of req.session.cart) {
      if(IdCourse == id){
        isAvailableAddCart = true;
        break;
      }
    }
    //let isAvailableAddCart = true;
    console.log("isAvailableAddCart:",isAvailableAddCart);
    res.render("vwCourses/detail", {
      course: course,
      listCourse : listCourse,
      listRating : listRating,
      isAvailableAddCart: isAvailableAddCart,
    });
  },
};
