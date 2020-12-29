const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");

module.exports = {
  getRegister: async (req, res) => {
    res.render("vwAccount/register");
  },
  postRegister: async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const user = {
      FullName: req.body.fullname,
      email: req.body.email,
      isTeacher: 0,
      permission: "student",
      username: req.body.username,
      password: hash,
    };
    await userModel.add(user);
    res.render("vwAccount/register");
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

    let url = req.session.retUrl || '/';
    res.redirect(url);
  },
  postLogout: async (req, res) => {
    req.session.isAuth = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
  },
  getProfile: async (req, res) => {
    res.render('vwAccount/profile');
  },
};
