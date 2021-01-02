const categoryModel = require('../models/category.model');
const courseModel = require('../models/course.model');
const headercategoryModel = require('../models/headercategory.model');

module.exports = {
    searchbody: async function(req, res) {
        const searchValue = req.body.searchValue;
        const sortBy = req.body.sortBy;
        res.redirect(`/search/category?name=${searchValue}&sortBy=${sortBy}`);
    },
    searchvalue: async function(req, res) {
        let sortBy = req.query.sortBy;
        let cateresult = courseresult = [];
        let hDisplay = cateDisplay = cDisplay = false;
        let domain;
        let searchValue;

        if (sortBy == 'Highest Rated') {
            sortBy = 'course.avgRate DESC';
        } else {
            if (sortBy == 'Lowest price') {
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
        if (cateresult.length !== 0) {
            for (const element of cateresult) {
                let list = await courseModel.getCoursebyCateID(element.Id, sortBy);
                for (const iterator of list) {
                    let fullimforation = await courseModel.getFullInformationByID(iterator.IdCourse);
                    courseresult = courseresult.concat(fullimforation);
                }
            }
        } else {
            //search by Course Name
            cDisplay = true;
            searchedCourse = await courseModel.searchByFulltext(searchValue, sortBy);
            console.log('searchedCourse', searchedCourse);
            if (searchedCourse.length !== 0) {
                for (const e of searchedCourse) {
                    const courses = await courseModel.getFullInformationByID(e.IdCourse);
                    courseresult = courseresult.concat(courses);
                    if (cateresult.indexOf(courses[0].NameCategory) == -1)
                        cateresult = cateresult.concat(courses[0].NameCategory);
                }
            }
        };
        res.render('../views/vwSearch/fulltextsearch.hbs', {
            listOfCourses: courseresult,
            listOfCategories: cateresult,
            noCourse: courseresult.length,
            searchValue: req.query.name,
            hDisplay: hDisplay,
            cateDisplay: cateDisplay,
            cDisplay: cDisplay,
            domain: domain
        });
    }

};