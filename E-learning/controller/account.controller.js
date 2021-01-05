const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const wishlistModel = require("../models/wishlist.model");
const courseModel = require("../models/course.model");
module.exports = {
  getRegister: async (req, res) => {
    res.render("vwAccount/register");
  },
  postRegister: async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const user = {
      FullName: req.body.fullName,
      Email: req.body.email,
      isTeacher: 0,
      Permission: "student",
      UserName: req.body.username,
      password: hash,
    };
    await userModel.add(user);
    res.redirect("/");
  },
  isAvailableAccount: async (req, res) => {
    const username = req.query.user;
    const user = await userModel.singleByUserName(username);
    if (user === null) {
      return res.json(true);
    }
    res.json(false);
  },
  getLogin: async (req, res) => {
    if (req.headers.referer) {
      req.session.retUrl = req.headers.referer;
    }
    res.render("vwAccount/login");
  },
  postLogin: async (req, res) => {
    const user = await userModel.singleByUserName(req.body.username);
    if (user === null) {
      return res.render("vwAccount/login", {
        err_message: "Invalid username or password.",
      });
    }

    const ret = bcrypt.compareSync(req.body.password, user.password);
    if (ret === false) {
      return res.render("vwAccount/login", {
        err_message: "Invalid username or password.",
      });
    }

    req.session.isAuth = true;
    req.session.authUser = user;

    if (String(req.session.authUser.Permission) === "teacher") {
      res.redirect("/teacher/");
    } else if (String(req.session.authUser.Permission) === "admin") {
      res.redirect("/admin/");
    } else {
      let url = req.session.retUrl || "/";
      if (
        String(req.session.retUrl).indexOf("/account/register") != -1 ||
        String(req.session.retUrl).indexOf("/account/login") != -1
      ) {
        url = "/";
      }
      res.redirect(url);
    }
  },
  postLogout: async (req, res) => {
    req.session.isAuth = false;
    req.session.authUser = null;
    req.session.cart = [];
    res.redirect(req.headers.referer);
  },
  getProfile: async (req, res) => {
    res.render("vwAccount/profile", { user: req.session.authUser });
  },
  postEditProfile: async (req, res) => {
    if (req.body.FullName === "") {
      return res.render("vwAccount/profile", {
        err_message: "Invalid full name data.",
        user: req.session.authUser,
      });
    }
    const ret = await userModel.editName(req.body.Username, req.body.FullName);
    req.session.authUser = await userModel.singleByUserName(req.body.Username);
    res.render("vwAccount/profile", { user: req.session.authUser });
  },
  getEditPassword: async (req, res) => {
    res.render("vwAccount/edit-password", { user: req.session.authUser });
  },
  postEditPassword: async (req, res) => {
    if (
      req.body.CurrentPassword === "" ||
      req.body.NewPassword === "" ||
      req.body.RetypeNewPassword === ""
    ) {
      return res.render("vwAccount/edit-password", {
        err_message: "Invalid password data.",
      });
    }
    const hashNewPw = bcrypt.hashSync(req.body.NewPassword, 10);

    const compare = bcrypt.compareSync(
      req.body.CurrentPassword,
      req.session.authUser.password
    );
    if (compare === false) {
      return res.render("vwAccount/edit-password", {
        err_message: "Your password was incorrect.",
      });
    }
    if (req.body.NewPassword != req.body.RetypeNewPassword) {
      return res.render("vwAccount/edit-password", {
        err_message: "Your new password does not match confirmation.",
      });
    }
    const ret = await userModel.changePassword(
      req.session.authUser.UserName,
      hashNewPw
    );
    req.session.authUser = await userModel.singleByUserName(req.body.Username);
    res.render("vwAccount/edit-password", { user: req.session.authUser });
  },
  getListWishList: async function (req, res) {
    const wishlist = await wishlistModel.getWishListByIdUser(
      req.session.authUser.IdUser
    );
    res.render("vwAccount/wishlist", {
      user: req.session.authUser,
      wishlist: wishlist,
      empty: wishlist.length === 0,
    });
  },
  getListCourse: async function (req, res) {
    const listCourse = await courseModel.getListCourseByIdUser(
      req.session.authUser.IdUser
    );
    res.render("vwAccount/list-course", {
      user: req.session.authUser,
      listCourse: listCourse,
      empty: listCourse.length === 0,
    });
  },
};
