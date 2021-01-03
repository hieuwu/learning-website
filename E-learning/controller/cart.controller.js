const cartModel = require("../models/cart.model");
const courseModel = require('../models/course.model');
module.exports = {
  getListCart: async function (req, res) {
    const items = [];
    for (const IdCourse of req.session.cart) {
      const course = await courseModel.single(IdCourse);
      items.push({
        course,
      });
    }
    res.render("vwCart/index", {
      items,
      empty: req.session.cart.length === 0,
    });
  },
  postAdd: async function (req, res) {
    cartModel.add(req.session.cart, +req.body.id);
    res.redirect(req.headers.referer);
  },
  postRemove: async function (req, res) {
    cartModel.del(req.session.cart, +req.body.id);
    res.redirect(req.headers.referer);
  },
};
