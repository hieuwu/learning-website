const wishlistModel = require("../models/wishlist.model");
const courseModel = require('../models/course.model');
module.exports = {
  postAdd: async function (req, res) {
    const wishlist = {
        IdUser : req.session.authUser.IdUser,
        IdCourse : req.body.id,
    }
    wishlistModel.add(wishlist);
    res.redirect(req.headers.referer);
  },
  postRemove: async function (req, res) {
    console.log("req.body.id:",req.body.id);
    console.log("req.session.authUser.IdUser:",req.session.authUser.IdUser);
    wishlistModel.del(req.session.authUser.IdUser, req.body.id)
    res.redirect(req.headers.referer);
  },
};
