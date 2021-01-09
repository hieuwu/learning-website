const courseModel = require("../models/course.model");
const wishlistModel = require("../models/wishlist.model");
module.exports = {
  getDetail: async function (req, res) {
    const IdCourse = req.params.id;
    const course = await courseModel.single(IdCourse);
    if (course === null) {
      return res.redirect("/");
    }
    var date = new Date(course.updatedTime);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var str = day+"/"+month+"/" + year;
    course.updatedTime = str;
    const listCourse = await courseModel.getCourseByIdCategory(course.IdCategory, IdCourse);
    const listRating = await courseModel.getListRating(IdCourse);
    let isAvailableAddCart = false;
    for (const Id of req.session.cart) {
      if(Id == IdCourse){
        isAvailableAddCart = true;
        break;
      }
    }
    let isWishList = false;
    let isJoinCourse = false;
    if(req.session.isAuth === true){
      const checkWishList = await wishlistModel.checkCourseWishList(req.session.authUser.IdUser, IdCourse);
      if(checkWishList != null){
        isWishList = true;
      }
      const getIsJoinCourse = await courseModel.checkIsJoinCourse(req.session.authUser.IdUser, IdCourse);
      if(getIsJoinCourse != null){
        isJoinCourse = true;
      }
    } 
    let numberRating = 0;
    const getNumberRating = await courseModel.getNumberRatingsCourse(IdCourse);
    if(getNumberRating != null){
      numberRating = getNumberRating.numberRating;
    }
    const getListLesson = await courseModel.getListLessonByCourseId(IdCourse);
    let listLesson = [];
    let listChapter = [];
    let flag = 0;
    for(let i = 0; i < getListLesson.length; i++){
      for(let j = i; j < getListLesson.length; j++){
        if(getListLesson[i].IdChapter === getListLesson[j].IdChapter){
          listLesson.push(getListLesson[j]);
          flag = j;
        }
      }
      
      listChapter.push({
        NameChapter: getListLesson[i].NameChapter,
        IdDiv: "collapse" + getListLesson[i].idChapter,
        dataBsTarget: "#collapse" + getListLesson[i].idChapter,
        ListLesson: listLesson,
      });
      listLesson = [];
      i = flag;
    }
    res.render("vwCourses/detail", {
      course: course,
      listCourse : listCourse,
      listRating : listRating,
      isAvailableAddCart: isAvailableAddCart,
      isWishList: isWishList,
      numberRating: numberRating,
      isJoinCourse: isJoinCourse,
      listChapter: listChapter,
    });
  },
  getVideoLesson: async function (req, res) {
    const IdCourse = req.params.idCourse;
    const IdChapter = req.params.idChapter;
    const IdLesson = req.params.idLesson;
    res.render("vwLesson/lesson",{
      layout: false,
      IdChapter: IdChapter,
      IdLesson: IdLesson,
    });
  },
};
