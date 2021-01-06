const express = require('express');
const router = express.Router();
const controller = require('../../controller/teacher/homepage.controller');
router.get('/', controller.getHomePage);
router.get("/", (req, res) => {
    res.render('teacher/teacherhomepage', {
        layou: 'signup',
        style: 'signup'
    });
})
module.exports = router;