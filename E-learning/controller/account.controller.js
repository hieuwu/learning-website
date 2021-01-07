const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_SERVER,
    pass: process.env.MAIL_SERVER_PASSWORD,
  },
});

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
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationObject = {
      email: req.body.email,
      otp: otp,
    };
    await userModel.createVerifyCode(verificationObject);
    var mailOptions = {
      from: process.env.MAIL_SERVER,
      to: req.body.email,
      subject: "Email verification",
      html: `<h1>Welcome</h1><h1>your verification code is ${otp}</h1>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.redirect("/account/verify");
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
    res.render("vwAccount/login", {
      layout: false
    });
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
    let url = req.session.retUrl || "/";
    if (
      String(req.session.retUrl).indexOf("/account/register") != -1 ||
      String(req.session.retUrl).indexOf("/account/login") != -1
    ) {
      url = "/";
    }
    res.redirect(url);
  },
  postLogout: async (req, res) => {
    req.session.isAuth = false;
    req.session.authUser = null;
    res.redirect("/");
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
    const hashCurrentPw = bcrypt.hashSync(req.body.CurrentPassword, 10);
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
    // if(req.session.authUser.password!= hashCurrentPw){
    //   return res.render("vwAccount/edit-password", {
    //     err_message: "Your password was incorrect.",
    //   });
    // }
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

  getVerifyPage: async (req, res) => {
    res.render("vwAccount/otp-confirm");
  },
  postVerifyAccount: async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const code = req.body.code;
    if (code == null) {
      res.sendStatus(404);
    }
    const user = {
      FullName: req.body.fullname,
      Email: req.body.email,
      isTeacher: 0,
      Permission: "student",
      UserName: req.body.username,
      password: hash,
    };
    let isAvailableCode = await userModel.isAvailableCode(code);
    if (isAvailableCode !== null) {
      console.log("Run here");
      await userModel.add(user);
      res.status(200).send();
      return;
    }
    console.log("Data:", user);
    res.status(400).send();
  },
};