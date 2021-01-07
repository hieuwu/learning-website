const courseModel = require('../models/course.model');

module.exports = {
    getTeachHomePage: async(req, res) => {
        res.render("vwHomepage/teacherhomepage", {});
    },



};