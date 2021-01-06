const courseModel = require('../models/course.model');

module.exports = {
    getadminHome: async(req, res) => {
        res.render("vwHomepage/adminhomepage", {});
    },
};