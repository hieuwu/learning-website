const userModel = require("../../models/user.model");
const courseModel = require('../../models/course.model');
const headercategoryModel = require("../../models/headercategory.model");
const categoryModel = require("../../models/category.model");
const config = require("../../config/default.json");

module.exports = {
    getHomePage: async(req, res) => {
        let page = +req.query.page || 1;
        if (page == 0) page = 1;
        let offset = (page - 1) * config.pagination.limit;
        if (!req.session.authUser) {
            console.log("go back guest home, run here")
            res.redirect("/")
        }
        const ID = req.session.authUser.IdUser;
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
    getProfile: async(req, res) => {
        if (!req.session.authUser) {
            console.log("go back guest home, run here")
            res.redirect("/")
        } else {
            const teachProfile = await userModel.getTeachProfileById(req.session.authUser.IdUser);
            console.log(teachProfile[0].Biography)
            res.render("Teacher/profile", {
                layout: 'teacher',
                user: req.session.authUser,
                Biography: teachProfile[0].Biography
            });
        }

    },
    getEditPassword: async(req, res) => {
        res.render("Teacher/edit-password", {
            layout: 'teacher',
            user: req.session.authUser
        });
    },
    postEditPassword: async(req, res) => {
        if (
            req.body.CurrentPassword === "" ||
            req.body.NewPassword === "" ||
            req.body.RetypeNewPassword === ""
        ) {
            return res.render("Teacher/edit-password", {
                layout: 'teacher',
                err_message: "Invalid password data.",
            });
        }
        const hashNewPw = bcrypt.hashSync(req.body.NewPassword, 10);

        const compare = bcrypt.compareSync(
            req.body.CurrentPassword,
            req.session.authUser.password
        );
        if (compare === false) {
            return res.render("Teacher/edit-password", {
                layout: 'teacher',
                err_message: "Your password was incorrect.",
            });
        }
        if (req.body.NewPassword != req.body.RetypeNewPassword) {
            return res.render("Teacher/edit-password", {
                layout: 'teacher',
                err_message: "Your new password does not match confirmation.",
            });
        }
        const ret = await userModel.changePassword(
            req.session.authUser.UserName,
            hashNewPw
        );
        req.session.authUser = await userModel.singleByUserName(req.body.Username);
        res.render("Teacher/edit-password", {
            layout: 'teacher',
            user: req.session.authUser
        });
    },
    postEditProfile: async(req, res) => {
        if (req.body.FullName === "") {
            return res.render("teacher/profile", {
                layout: 'teacher',
                err_message: "Invalid full name data.",
                user: req.session.authUser,
            });
        }
        const ret = await userModel.editName(req.body.Username, req.body.FullName);
        const retBio = await userModel.editBio(req.body.IdUser, req.body.Biography);
        req.session.authUser = await userModel.singleByUserName(req.body.Username);
        res.render("teacher/profile", {
            layout: 'teacher',
            user: req.session.authUser,
            Biography: req.body.Biography
        });
    },
    getAddCourse: async(req, res) => {
        const listOfCategory = await categoryModel.all();
        const listOfHeaderCategory = await headercategoryModel.all();
        res.render("teacher/course-add", {
            layout: 'teacher',
            user: req.session.authUser,
            listOfCategory: listOfCategory,
            listOfHeaderCategory: listOfHeaderCategory

        });
    },
    postAddCourse: async(req, res) => {
        const newcourse = {
                nameCourse: req.body.nameCourse,
                title: req.body.title,
                Description: req.body.Description,
                Price: req.body.Price,
                SaleCost: req.body.Price,
                IdCategory: req.body.category,
                avgRate: 0,
                IdTeacher: req.session.authUser.IdUser
            }
            // req.body;
            //t chưa làm xong, có lên
        console.log(req.body);
        console.log(newcourse);
        const ret = await courseModel.addCourse(newcourse);
        // res.redirect('teacher/course-add');
        res.render("teacher/course-edit", {
            layout: 'teacher',
            user: req.session.authUser,
        });
    },
};