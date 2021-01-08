const courseModel = require('../../models/course.model');
const config = require("../../config/default.json");

module.exports = {
    getHomePage: async(req, res) => {
        let page = +req.query.page || 1;
        if (page == 0) page = 1;
        let offset = (page - 1) * config.pagination.limit;
        const ID = req.session.authUser.IdUser;
        console.log("iduser:", req.session.authUser.IdUser)
        let listOfCourses = await courseModel.coursePageByTeacherID(ID, offset);
        const total = await courseModel.countCourseByTeacherID(ID);
        let nPages = Math.ceil(total / config.pagination.limit);
        console.log(nPages);
        let page_items = [];
        for (i = 1; i <= nPages; i++) {
            const item = {
                value: i,
            };
            page_items.push(item);
        }
        console.log(listOfCourses);
        res.render("teacher/teacherhomepage", {
            layout: 'teacher',
            listOfCourses: listOfCourses,
            page_items: page_items,
            can_go_next: page < nPages,
            can_go_prev: page > 1,
            prev_value: page - 1,
            next_value: page + 1,
        });
    },
};