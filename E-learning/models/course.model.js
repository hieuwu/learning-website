const db = require('../utils/db');
const config = require('../config/default.json')
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
        return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,course.title,
        course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime, course.nOViews,
        count(chapter.IdChapter) as numOfChapters
        from ${TBL_COURSE} 
        left join user_profile
        on course.IdTeacher = user_profile.IdUser
        inner join category
        on course.IdCategory = category.Id
        inner join chapter
        on course.IdCourse = chapter.idCourse
        where category.Id= ${categoryId}
        group by course.IdCourse
        order by course.nOViews DESC limit 10`);
    },
    async pageBycat(catId, offset) {
        return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,course.title,
        course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime, course.nOViews,
        count(chapter.IdChapter) as numOfChapters
        from ${TBL_COURSE} 
        left join user_profile
        on course.IdTeacher = user_profile.IdUser
        inner join category
        on course.IdCategory = category.Id
        inner join chapter
        on course.IdCourse = chapter.idCourse
        where category.Id= ${catId}
        group by course.IdCourse
        order by course.nOViews DESC limit ${config.pagination.limit} offset ${offset}`);
    },
    async countByCat(catId) {
        let rows = await db.load(`select count(*) as total from ${TBL_COURSE} 
        inner join category
        on course.IdCategory = category.Id
        where category.Id= ${catId}`);
        return rows[0].total;
    }
};