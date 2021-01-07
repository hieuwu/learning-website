const courseModel = require("../../models/course.model");
const config = require("../../config/default.json");
const categoryModel = require("../../models/category.model");
module.exports = {
  getadminHome: async (req, res) => {
    res.render("admin/adminhomepage", {
      layout: "admin",
    });
  },
  getAllCourse: async (req, res) => {
    let page = +req.query.page || 1;
    if (page == 0) page = 1;
    let offset = (page - 1) * config.pagination.limit;
    let listOfCourses = await courseModel.pageByAll(offset);
    const total = await courseModel.countAllCourse();
    let nPages = Math.ceil(total / config.pagination.limit);
    let page_items = [];
    for (i = 1; i <= nPages; i++) {
      const item = {
        value: i,
      };
      page_items.push(item);
    }

    res.render("admin/course-all", {
      listOfCourses: listOfCourses,
      page_items: page_items,
      can_go_next: page < nPages,
      can_go_prev: page > 1,
      prev_value: page - 1,
      next_value: page + 1,
      title: listOfCourses[0].NameCategory,
    });
  },
  deleteCourse: async (req, res) => {
    const IdCourse = req.body.IdCourse;
    console.log(IdCourse);
    let deletedCourse = await courseModel.deleteCourse(IdCourse);
    res.redirect("/course/all");
  },

  getCourseDetail: async (req, res) => {
    const IdCourse = req.params.id;
    const course = await courseModel.single(IdCourse);
    if (course === null) {
      return res.redirect("/");
    }
    var date = new Date(course.updatedTime);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var str = day + "/" + month + "/" + year;
    course.updatedTime = str;
    const listCourse = await courseModel.getCourseByIdCategory(
      course.IdCategory,
      IdCourse
    );
    const listRating = await courseModel.getListRating(IdCourse);
    let isAvailableAddCart = false;
    for (const Id of req.session.cart) {
      if (Id == IdCourse) {
        isAvailableAddCart = true;
        break;
      }
    }
    let isWishList = false;
    if (req.session.isAuth === true) {
      const checkWishList = await wishlistModel.checkCourseWishList(
        req.session.authUser.IdUser,
        IdCourse
      );
      if (checkWishList != null) {
        isWishList = true;
      }
    }
    res.render("admin/course-detail", {
      course: course,
      listCourse: listCourse,
      listRating: listRating,
      isAvailableAddCart: isAvailableAddCart,
      isWishList: isWishList,
    });
  },
  getEditCoursePage: async (req, res) => {
    const IdCourse = req.params.id;
    let listOfCategories = await categoryModel.all();
    let courseDetail = await courseModel.single(IdCourse);
    res.render("admin/course-edit", {
      course: courseDetail,
      listOfCategories: listOfCategories,
    });
  },
  editCourse: async (req, res) => {
    const IdCourse = req.params.id;
    let listOfCategories = await categoryModel.all();
    let courseDetail = await courseModel.single(IdCourse);
    const {
      nameCourse,
      Description,
      title,
      IdCategory,
      Price,
      SaleCost,
    } = req.body;
    console.log("data:", {
      nameCourse,
      Description,
      title,
      IdCategory,
      Price,
      SaleCost,
    });
    let isUpdated = await courseModel.updateCourse(IdCourse, {
      nameCourse,
      Description,
      title,
      IdCategory,
      Price,
      SaleCost,
    });
    res.render("admin/course-edit", {
      course: courseDetail,
      listOfCategories: listOfCategories,
      err_message: "Course updated successfully",
    });
  },
  getCategoryPage: async (req, res) => {
    let listOfCategories = await categoryModel.all();
    res.render('admin/category-all', {
      listOfCategories: listOfCategories,
    });
  },
  getEditCategoryPage: async (req, res) => {
    res.render('admin/category-edit');
  }
};
