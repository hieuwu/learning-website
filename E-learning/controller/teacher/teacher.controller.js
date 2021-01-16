const bcrypt = require("bcryptjs");
var multer = require('multer');
var bodyParser = require('body-parser');
const mkdirp = require('mkdirp');
const fs = require('fs');
const userModel = require("../../models/user.model");
const courseModel = require('../../models/course.model');
const headercategoryModel = require("../../models/headercategory.model");
const categoryModel = require("../../models/category.model");
const config = require("../../config/default.json");
const { countByDomain } = require('../../models/course.model');

module.exports = {
    getHomePage: async(req, res) => {
        let sortBy = req.query.sortBy;
        let page = +req.query.page || 1;
        if (sortBy == "Unpublished first") { sortBy = "status desc"; } else {
            sortBy = "status asc";
        };

        if (page == 0) page = 1;
        let offset = (page - 1) * config.pagination.limit;
        if (!req.session.authUser) {
            console.log("go back guest home, run here")
            res.redirect("/")
        }
        const ID = req.session.authUser.IdUser;
        let listOfCourses = await courseModel.coursePageByTeacherID(ID, sortBy, offset);
        const total = await courseModel.countCourseByTeacherID(ID);
        let nPages = Math.ceil(total / config.pagination.limit);
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
                user: req.session.authUser,
                err_message: "Your password was incorrect.",
            });
        }
        if (req.body.NewPassword != req.body.RetypeNewPassword) {

            return res.render("Teacher/edit-password", {
                layout: 'teacher',
                user: req.session.authUser,
                err_message: "Your new password does not match confirmation.",
            });
        }
        const ret = await userModel.changePassword(
            req.session.authUser.UserName,
            hashNewPw
        );
        req.session.authUser = await userModel.singleByUserName(req.session.authUser.UserName);
        res.render("teacher/edit-password", {
            layout: 'teacher',
            user: req.session.authUser,
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
        const ret = await courseModel.addCourse(newcourse);
        const idNewCourse = await courseModel.getNewCourseByIDTeacher(newcourse.IdTeacher);
        res.redirect('/teacher/course/' + idNewCourse[0].IdCourse);
    },
    getDetailCourse: async(req, res) => {
        const IdCourse = req.params.id;
        const course = await courseModel.single(IdCourse);
        const teacher = await userModel.singleTeacher(course.IdTeacher);
        if (course === null) {
            return res.redirect("/");
        }
        const isFinish = course.status == "finished" ? true : false;
        var date = new Date(course.updatedTime);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var str = day + "/" + month + "/" + year;
        course.updatedTime = str;
        const listCourse = await courseModel.getCourseByIdCategory(course.IdCategory, IdCourse);
        const listRating = await courseModel.getListRating(IdCourse);
        let numberRating = 0;
        const getNumberRating = await courseModel.getNumberRatingsCourse(IdCourse);
        if (getNumberRating != null) {
            numberRating = getNumberRating.numberRating;
        }
        const getListLesson = await courseModel.getListLessonByCourseId(IdCourse);
        let listLesson = [];
        let listChapter = [];
        let flag = 0;
        for (let i = 0; i < getListLesson.length; i++) {
            for (let j = i; j < getListLesson.length; j++) {
                if (getListLesson[i].IdChapter === getListLesson[j].IdChapter) {
                    listLesson.push(getListLesson[j]);
                    flag = j;
                }
            }

            listChapter.push({
                NameChapter: getListLesson[i].NameChapter,
                IdDiv: "collapse" + getListLesson[i].idChapter,
                dataBsTarget: "#collapse" + getListLesson[i].idChapter,
                ListLesson: listLesson,
            });
            listLesson = [];
            i = flag;
        }
        res.render("teacher/course-Detail", {
            layout: 'teacher',
            course: course,
            teacher: teacher,
            listCourse: listCourse,
            listRating: listRating,
            isFinish: isFinish,
            numberRating: numberRating,
            listChapter: listChapter,
        });
    },
    getVideoLesson: async function(req, res) {
        const IdCourse = req.params.idCourse;
        const IdChapter = req.params.idChapter;
        const IdLesson = req.params.idLesson;
        res.render("teacher/lesson-edit", {
            layout: false,
            IdChapter: IdChapter,
            IdLesson: IdLesson,
        });
    },
    getEditCourse: async function(req, res) {
        const idCourse = req.params.id;
        const course = await courseModel.single(idCourse);
        const listOfCategory = await categoryModel.all();
        const listOfHeaderCategory = await headercategoryModel.all();
        res.render("teacher/course-edit", {
            layout: 'teacher',
            user: req.session.authUser,
            course: course,
            listOfCategory: listOfCategory,
            listOfHeaderCategory: listOfHeaderCategory
        });
    },
    postEditCourse: async function(req, res) {
        var storage = multer.diskStorage({
            destination: function(req, file, cb) {
                let dir = './public/images/course/' + req.params.id;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                cb(null, dir)
            },
            filename: function(req, file, cb) {
                cb(null, 'thumb.jpg')
            }
        })
        var upload = multer({ storage: storage })
        upload.single('fuImage')(req, res, async function(err) {
            if (err) { console.log(err) } else {
                const edit = {
                    nameCourse: req.body.nameCourse,
                    IdCategory: req.body.category,
                    title: req.body.title,
                    Description: req.body.Description,
                    SaleCost: req.body.SaleCost,
                    status: req.body.status,
                };
                const IdCourse = +req.body.IdCourse;
                await courseModel.updateCourse(IdCourse, edit);
                res.redirect("/teacher/course/" + IdCourse);
            }
        })
    },
    getUpload: async function(req, res) {
        const idCourse = req.params.id; //hidden
        const listChapter = await courseModel.getListChapterByCourseId(idCourse);
        const listLession = await courseModel.getListLessonByCourseId(idCourse);
        res.render("teacher/course-upload", {
            layout: 'teacher',
            user: req.session.authUser,
            idCourse: idCourse,
            listLession: listLession,
            listChapter: listChapter
        });
    },
    postUpload: async function(req, res) {
        const idCourse = req.params.id;
        let idChapter = req.query.idChapter;
        let idLesson = req.query.idLesson;
        let newChapter = req.query.newChapter;
        let newLesson = req.query.newLesson;
        if (idChapter == 'new') {
            await courseModel.addChapter({ NameChapter: newChapter, idCourse: idCourse });
            let Chapter = await courseModel.getChapterByCourse(idCourse);
            await courseModel.addLesson({ NameLesson: newLesson, Video: '', idChapter: Chapter[0].IdChapter });
            let Lesson = await courseModel.getLessonByChapter(Chapter[0].IdChapter);
            idChapter = Chapter[0].IdChapter;
            idLesson = Lesson[0].idLesson;
        } else {
            if (idLesson == 'new') {
                await courseModel.addLesson({ NameLesson: newLesson, Video: '', idChapter: idChapter });
                let Lesson = await courseModel.getLessonByChapter(idChapter);
                idLesson = Lesson[0].idLesson;
            }
        }
        const url = './public/video/IdChapter' + idChapter + '/IdLesson' + idLesson;
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                const dir = url;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                cb(null, dir)
            },
            filename: function(req, file, cb) {
                cb(null, "video." + file.originalname.split(".")[1]);
            }
        });
        const upload = multer({ storage: storage });
        upload.single('fuVideo')(req, res, function(err) {
            if (err) {
                console.log('Loi roi', err, req.query)
            } else {
                res.redirect('/teacher/course/upload/' + idCourse)
            }
        });
    },
};