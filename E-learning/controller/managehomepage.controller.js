const courseModel = require('../models/course.model');

module.exports = {
    getLatestCourse: async(req, res) => {
        res.render("vwHomepage/managementhome", {});
    },



};