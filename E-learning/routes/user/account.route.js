const express = require('express');
const router = express.Router();
const controller = require('../../controller/account.controller');
const auth = require('../../middlewares/auth.mdw');
router.get('/register', controller.getRegister);
router.post('/register', controller.postRegister);
router.get('/verify', controller.getVerifyPage);
router.post('/verify', controller.postVerifyAccount);
router.get('/is-available', controller.isAvailableAccount);
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);
router.post('/logout', controller.postLogout);
router.get('/profile', controller.getProfile);
router.get('/edit-password', controller.getEditPassword);
router.post('/profile/edit', controller.postEditProfile);
router.post('/edit-password/edit', controller.postEditPassword);
router.get('/list-course', controller.getListCourse);
router.get('/wishlist', controller.getListWishList);
//router.get('/teach-register', controller.getTeachRegister);
// router.post('/teach-register', controller.postTeachRegister);
module.exports = router;