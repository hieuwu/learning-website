module.exports = function (app) {
  app.use("/", require("../routes/front/homepage.route"));
  app.use("/account", require("../routes/front/account.route"));
  app.use("/course", require("../routes/front/course.route"))
};
