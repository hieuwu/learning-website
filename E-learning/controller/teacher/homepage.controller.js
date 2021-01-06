const courseModel = require('../../models/course.model');

module.exports = {
    getHomePage: async(req, res) => {
        res.render("teacher/teacherhomepage", {
            layout: 'teacher',
        });
    },
};