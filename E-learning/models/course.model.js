const db = require('../utils/db');

const TBL_COURSE = 'course';
module.exports = {
    async all() {
        return await db.load(`select * from ${TBL_COURSE}`);
    },

    async getLatest() {
        return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,
                                course.nameCourse,category.NameCategory, course.Price, course.SaleCost, course.title
                                from ${TBL_COURSE}
                                left join user_profile
                                on course.IdTeacher = user_profile.IdUser
                                inner join category
                                on course.IdCategory = category.Id
                                order by IdCourse DESC limit 10`);
    },

    async getMostViewed() {
        return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,
                            course.nameCourse, category.NameCategory, course.Price, course.SaleCost,course.title,
                            course.createdTime, course.nOViews
                            from ${TBL_COURSE} 
                            left join user_profile
                            on course.IdTeacher = user_profile.IdUser
                            inner join category
                            on course.IdCategory = category.Id
                            order by course.nOViews DESC limit 10`);
    },

    async getMostRegistered() {
        return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,
                            course.nameCourse, category.NameCategory, course.Price, course.SaleCost,course.title,
                            course.createdTime, course.nOViews
                            from ${TBL_COURSE} 
                            left join user_profile
                            on course.IdTeacher = user_profile.IdUser
                            inner join category
                            on course.IdCategory = category.Id
                            order by course.nOViews DESC limit 10`);
    },

    async getCourseListbyCategory(categoryId) {
        return await db.load(`select course.IdCourse FullName, nameCourse, course.Description,course.title,
        course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime, course.nOViews
        from ${TBL_COURSE} 
        left join user_profile
        on course.IdTeacher = user_profile.IdUser
        inner join category
        on course.IdCategory = category.Id
        where category.Id=${categoryId}
        order by course.nOViews DESC limit 10`);
    }
};