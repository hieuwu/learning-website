const courseModel = require("../../models/course.model");
const config = require("../../config/default.json");
const categoryModel = require("../../models/category.model");
const headercategoryModel = require("../../models/headercategory.model");
const userModel = require("../../models/user.model");
const wishlistModel = require("../../models/wishlist.model");
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
    console.log(listOfCourses[0]);

    res.render("admin/course-all", {
      layout: "admin",
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
    await courseModel.deleteCourse(IdCourse);
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
      layout: "admin",
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
      layout: "admin",
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
    await courseModel.updateCourse(IdCourse, {
      nameCourse,
      Description,
      title,
      IdCategory,
      Price,
      SaleCost,
    });
    res.render("admin/course-edit", {
      layout: "admin",
      course: courseDetail,
      listOfCategories: listOfCategories,
      err_message: "Course updated successfully",
    });
  },
  getCategoryPage: async (req, res) => {
    let listOfCategories = await categoryModel.all();
    res.render("admin/category-all", {
      layout: "admin",
      listOfCategories: listOfCategories,
    });
  },
  getEditCategoryPage: async (req, res) => {
    const categoryId = req.params.id;
    let headerCategories = await headercategoryModel.all();
    let category = await categoryModel.getCategoryById(categoryId);
    let headerCategoryName = await headercategoryModel.getById(
      category.HeaderCategoryID
    );

    res.render("admin/category-edit", {
      layout: "admin",
      headerCategoryName: headerCategoryName.HeaderNameCategory,
      category: category,
      headerCategories: headerCategories,
    });
  },
  editCategoryById: async (req, res) => {
    const categoryId = req.params.id;
    const { NameCategory, HeaderCategoryId } = req.body;
    console.log(req.body);
    await categoryModel.updateCategoryById(categoryId, {
      NameCategory,
      HeaderCategoryId,
    });
    let headerCategories = await headercategoryModel.all();
    let category = await categoryModel.getCategoryById(categoryId);
    let headerCategoryName = await headercategoryModel.getById(
      category.HeaderCategoryID
    );
    res.render("admin/category-edit", {
      layout: "admin",
      headerCategoryName: headerCategoryName.HeaderNameCategory,
      err_message: "Category updated successfully",
      category: category,
      headerCategories: headerCategories,
    });
  },
  deleteCategory: async (req, res) => {
    const Id = req.body.Id;
    await categoryModel.deleteCategory(Id);
    res.redirect("/category/all");
  },
  getAddCategoryPage: async (req, res) => {
    let headerCategories = await headercategoryModel.all();
    res.render("admin/category-add", {
      layout: "admin",
      headerCategories: headerCategories,
    });
  },
  addNewCategory: async (req, res) => {
    console.log(req.body);
    const { NameCategory, HeaderCategoryId } = req.body;
    let headerCategories = await headercategoryModel.all();
    await categoryModel.addNewCategory({ NameCategory, HeaderCategoryId });
    res.render("admin/category-add", {
      layout: "admin",
      err_message: "New category is added successfully",
      headerCategories: headerCategories,
    });
  },

  getHeaderCategoryPage: async (req, res) => {
    let listOfCategories = await headercategoryModel.all();
    res.render("admin/headercategory-all", {
      layout: "admin",
      listOfCategories: listOfCategories,
    });
  },
  getEditHeaderCategoryPage: async (req, res) => {
    const categoryId = req.params.id;
    let category = await headercategoryModel.getById(categoryId);
    res.render("admin/headercategory-edit", {
      layout: "admin",
      category: category,
    });
  },
  editHeaderCategoryById: async (req, res) => {
    const categoryId = req.params.id;
    const { HeaderNameCategory } = req.body;
    console.log(req.body);
    await headercategoryModel.updateHeaderCategoryById(categoryId, {
      HeaderNameCategory,
    });
    let category = await headercategoryModel.getById(categoryId);
    res.render("admin/headercategory-edit", {
      layout: "admin",
      err_message: "Header category is updated successfully",
      category: category,
    });
  },
  deleteHeaderCategory: async (req, res) => {
    const Id = req.body.Id;
    await headercategoryModel.deleteHeaderCategory(Id);
    res.redirect("/headercategory/all");
  },
  getAddHeaderCategoryPage: async (req, res) => {
    res.render("admin/headercategory-add", { layout: "admin" });
  },
  addNewHeaderCategory: async (req, res) => {
    console.log(req.body);
    const { HeaderNameCategory } = req.body;
    await headercategoryModel.addNewHeaderCategory({ HeaderNameCategory });
    res.render("admin/headercategory-add", {
      layout: "admin",
      err_message: "New category is added successfully",
    });
  },
  getAllTeacher: async (req, res) => {
    let page = +req.query.page || 1;
    if (page == 0) page = 1;
    let offset = (page - 1) * config.pagination.limit;
    let listOfTeachers = await userModel.pageByAllTeacher(offset);
    listOfTeachers.forEach((item) => {
      if (item.status === "Block") {
        item.isBlocked = true;
      } else {
        item.isBlocked = false;
      }
    });
    const total = await userModel.countAllTeacher();
    let nPages = Math.ceil(total / config.pagination.limit);
    let page_items = [];
    for (i = 1; i <= nPages; i++) {
      const item = {
        value: i,
      };
      page_items.push(item);
    }
    res.render("admin/teacher-all", {
      layout: "admin",
      listOfTeachers: listOfTeachers,
      page_items: page_items,
      can_go_next: page < nPages,
      can_go_prev: page > 1,
      prev_value: page - 1,
      next_value: page + 1,
    });
  },
  getTeacherById: async (req, res) => {
    const userId = req.params.id;
    let user = await userModel.singleTeacher(userId);
    res.render("admin/teacher-detail", { user: user, layout: "admin" });
  },
  blockTeacher: async (req, res) => {
    const Id = req.body.teacherId;
    await userModel.blockTeacher(Id);
    res.redirect("/teacher/all");
  },
  unblockTeacher: async (req, res) => {
    const Id = req.body.teacherId;
    await userModel.unblockTeacher(Id);
    res.redirect("/teacher/all");
  },
  getPendingTeacherPage: async (req, res) => {
    let listPendingTeachers = await userModel.getPendingTeacher();
    listPendingTeachers.forEach((item) => {
      if (item.status === "Processing") {
        item.isProcessing = true;
      } else {
        item.isProcessing = false;
      }
    });
    res.render("admin/teacher-pending", {
      layout: "admin",
      listPendingTeachers: listPendingTeachers,
    });
  },
  approvePendingTeacher: async (req, res) => {
    const id = req.body.teacherId;
    await userModel.approvePendingTeacher(id);
    res.redirect("/teacher/all/pending");
  },
  declineTeacher: async (req, res) => {
    const id = req.body.teacherId;
    await userModel.declinePendingTeacher(id);
    res.redirect("/teacher/all/pending");
  },
  getAllUserPage: async (req, res) => {
    let page = +req.query.page || 1;
    if (page == 0) page = 1;
    let offset = (page - 1) * config.pagination.limit;
    let listOfUsers = await userModel.pageByAllUser(offset);
    const total = await userModel.countAllUser();
    let nPages = Math.ceil(total / config.pagination.limit);
    let page_items = [];
    for (i = 1; i <= nPages; i++) {
      const item = {
        value: i,
      };
      page_items.push(item);
    }
    res.render("admin/user-all", {
      layout: "admin",
      listOfUsers: listOfUsers,
      page_items: page_items,
      can_go_next: page < nPages,
      can_go_prev: page > 1,
      prev_value: page - 1,
      next_value: page + 1,
    });
  },
  getUserById: async (req, res) => {
    const userId = req.params.id;
    let user = await userModel.single(userId);
    let numberOfCourses = await userModel.countCoursesOfUser(userId);
    res.render("admin/user-detail", {
      user: user,
      numberOfCourses: numberOfCourses,
      layout: "admin",
    });
  },
  getAdminProfilePage: async (req, res) => {
    let user = await userModel.getAdminProfile();
    res.render("admin/admin-profile", {
      layout: "admin",
      user: user,
    });
  },
  editAdminProfile: async (req, res) => {
    console.log("Data:", req.body);
    const { FullName, UserName } = req.body;
    await userModel.editName(UserName, FullName);
    let user = await userModel.getAdminProfile();
    res.render("admin/admin-profile", {
      layout: "admin",
      user: user,
    });
  },
  editUserByAdmin: async (req, res) => {
    const userId = req.params.id;
    const { FullName, Username } = req.body;
    await userModel.editName(Username, FullName);
    let user = await userModel.single(userId);
    let numberOfCourses = await userModel.countCoursesOfUser(userId);
    res.render("admin/user-detail", {
      user: user,
      numberOfCourses: numberOfCourses,
      layout: "admin",
    });
  },
  enableCourse: async (req, res) => {
    const IdCourse = req.body.IdCourse;
    await courseModel.enableCourse(IdCourse);
    res.redirect("/course/all");
  },
  blockStudent: async (req, res) => {
    const Id = req.body.teacherId;
    await userModel.blockStudent(Id);
    res.redirect("admin/user-all");
  },
  unblockStudent: async (req, res) => {
    const Id = req.body.teacherId;
    await userModel.unblockStudent(Id);
    res.redirect("admin/user-all");
  }
};
