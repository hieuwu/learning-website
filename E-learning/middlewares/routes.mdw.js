// module.exports = function(app, act) {
//     console.log(act == 0);
//     if (act == 0) {
//         console.log("app")
//         app.use("/", require("../routes/front/homepage.route"));
//         app.use("/account", require("../routes/front/account.route"));
//         app.use("/search", require("../routes/front/searchpage.route"));
//         app.use("/course", require("../routes/front/course.route"))
//     } else {
//         console.log('app1')
//         app.use("/", require("../routes/front/managehomepage.route"));
//     }
// };
module.exports = function(app) {
    app.use("/", require("../routes/front/homepage.route"));
    app.use("/account", require("../routes/front/account.route"));
    app.use("/search", require("../routes/front/searchpage.route"));
    app.use("/course", require("../routes/front/course.route"));
    app.use("/cart", require("../routes/front/cart.route"));
    app.use("/wishlist", require("../routes/front/wishlist.route"));
};

