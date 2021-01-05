const express = require('express');
const controller = require('../../controller/cart.controller');
const router = express.Router();

router.get('/', controller.getListCart)

router.post('/add', controller.postAdd);

router.post('/remove', controller.postRemove);

// router.post('/checkout', async function (req, res) {
//   const details = [];
//   let total = 0;
//   for (const ci of req.session.cart) {
//     const product = await productModel.single(ci.id);
//     const amount = ci.quantity * product.Price;
//     total += amount;

//     details.push({
//       ProID: product.ProID,
//       Quantity: ci.quantity,
//       Price: product.Price,
//       Amount: amount
//     });
//   }

//   const order = {
//     OrderDate: moment().format('YYYY-MM-DD HH:mm:ss'),
//     UserID: req.session.authUser.id,
//     Total: total
//   }
//   await orderModel.add(order);

//   for (const detail of details) {
//     detail.OrderID = order.OrderID;
//     await orderDetailModel.add(detail);
//   }

//   req.session.cart = [];
//   res.redirect(req.headers.referer);
// });

module.exports = router;