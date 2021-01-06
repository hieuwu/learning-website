const restrict = require('../middlewares/auth.mdw');
module.exports = function(app) {
    app.use("/", restrict.isUser, require("../routes/user/homepage.route"));
    app.use("/account", restrict.isUser, require("../routes/user/account.route"));
    app.use("/search", restrict.isUser, require("../routes/user/searchpage.route"));
    app.use("/course", restrict.isUser, require("../routes/user/course.route"));
    app.use("/cart", restrict.isUser, require("../routes/user/cart.route"));
    app.use("/wishlist", restrict.isUser, require("../routes/user/wishlist.route"));
    app.use("/teacher", restrict.isTeacher, require("../routes/teacher/teacher.route"));
    app.use("/admin", restrict.isAdmin, require("../routes/admin/admin.route"));
};