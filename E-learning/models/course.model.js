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
    async getCoursebyCateID(condition, sortBy) {
        return await db.load(`select * from ${TBL_COURSE} where IdCategory=${condition} order by ${sortBy}`);
    },
    async getFullInformationByID(condition) {
        const rows = await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,
        course.nameCourse, category.NameCategory, course.Price, course.SaleCost,course.title,
        course.createdTime, course.nOViews,course.avgRate ,course.subscribe
        from ${TBL_COURSE} 
        left join user_profile
        on course.IdTeacher = user_profile.IdUser
        inner join category
        on course.IdCategory = category.Id
        inner join headercategory
        on category.headercategoryid=headercategory.id
        where course.IdCourse = ${condition}
        group by course.idcourse`);
        return rows;
    },
    async searchByFulltext(text, sortby) {
        return await db.load(`select * from ${TBL_COURSE} where match(nameCourse) against('${text}')
         order by ${sortby}`);

    }
};