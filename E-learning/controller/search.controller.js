const categoryModel = require('../models/category.model');
const courseModel = require('../models/course.model');
const headercategoryModel = require('../models/headercategory.model');
const config = require("../config/default.json");

module.exports = {
    searchbody: async function(req, res) {
        const searchValue = req.body.searchValue;
        const sortBy = req.body.sortBy;
        res.redirect(`/search/category?name=${searchValue}&sortBy=${sortBy}`);
    },
    searchvalue: async function(req, res) {
        let sortby = req.query.sortBy;
        let cateresult = courseresult = [];
        let hDisplay = cateDisplay = cDisplay = false;
        let domain, sortBy;
        let searchValue;
        let page = +req.query.page || 1;
        if (page == 0) page = 1;
        let offset = (page - 1) * config.pagination.limit;
        let total = 0;
        if (sortby == 'Highest Rated') {
            sortBy = 'course.avgRate DESC';
        } else {
            if (sortby == 'Lowest price') {
                sortBy = 'course.price ASC, course.saleCost ASC';
            } else {
                res.render('../views/500.hbs');
            }
        }
        const headercourse = await headercategoryModel.simpleSearch(req.query.name);
        if (headercourse.length !== 0) {
            //search by headerCategory Name
            searchValue = headercourse[0].Id;
            cateresult = await categoryModel.getbyHeaderID(searchValue);
            domain = cateresult.Id;
            hDisplay = true;
        } else {
            //search by Category Name
            searchValue = req.query.name;
            cateresult = await categoryModel.searchByFulltext(searchValue);
            if (cateresult.length !== 0) cateDisplay = true;
        };
        let list = '-1';
        if (cateresult.length !== 0) {
            for (const e of cateresult) {
                list = list + "," + e.Id;
            }
            let list1 = await courseModel.countCoursebyCateID(list);
            total = list1[0].count;
            courseresult = await courseModel.getFullInformationByCate(list, sortBy, offset);
        } else {
            //search by Course Name
            cDisplay = true;
            searchedCourse = await courseModel.searchByFulltext(searchValue, sortBy);
            total = searchedCourse.length;
            for (const iterator of searchedCourse) {
                list = list + "," + iterator.IdCourse;
            }
            if (searchedCourse.length !== 0) {
                courseresult = await courseModel.getFullInformationByID(list, sortBy, offset);
            }
        };
        let nPages = Math.ceil(total / config.pagination.limit);
        let page_items = [];
        for (i = 1; i <= nPages; i++) {
            const item = {
                value: i,
            };
            page_items.push(item);
        }

        res.render('vwSearch/fulltextsearch', {
            listOfCourses: courseresult,
            listOfCategories: cateresult,
            noCourse: total,
            searchValue: req.query.name,
            hDisplay: hDisplay,
            cateDisplay: cateDisplay,
            cDisplay: cDisplay,
            domain: domain,
            sortBy: sortby,
            page_items: page_items,
            can_go_next: page < nPages,
            can_go_prev: page > 1,
            prev_value: page - 1,
            next_value: page + 1,
        });
    }

};