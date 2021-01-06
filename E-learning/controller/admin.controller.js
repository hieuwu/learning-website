const courseModel = require('../models/course.model');
const config = require('../config/default.json');
module.exports = {
    getadminHome: async(req, res) => {
        res.render("vwHomepage/adminhomepage", {});
    },
    getAllCourse: async (req, res) => {
        let page = +req.query.page || 1;
        if (page == 0) page = 1;
        let offset = (page - 1) * config.pagination.limit;
        let listOfCourses = await courseModel.pageByAll(offset);
        const total = await courseModel.countAllCourse();
        let nPages = Math.ceil(total / config.pagination.limit);
        let page_items = [];
        for (i = 1; i <= nPages; i++) {
        const item = {
            value: i,
        };
        page_items.push(item);
        }

        res.render("vwCourses/course-admin", {
            listOfCourses: listOfCourses,
            page_items: page_items,
            can_go_next: page < nPages,
            can_go_prev: page > 1,
            prev_value: page - 1,
            next_value: page + 1,
            title: listOfCourses[0].NameCategory,
        });
    },
    deleteCourse: async (req, res) => {
        res.render("vwCourses/add-course", {});
    }
};