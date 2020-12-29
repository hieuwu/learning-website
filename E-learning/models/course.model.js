const db = require('../utils/db');

const TBL_COURSE = 'course';
module.exports = {
    async all() {
        return await db.load(`select * from ${TBL_COURSE}`);
    },

    async getLatest() {
        return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,
                                course.nameCourse,category.NameCategory
                                from ${TBL_COURSE}
                                left join user_profile
                                on course.IdTeacher = user_profile.IdUser
                                inner join category
                                on course.IdCategory = category.Id
                                order by IdCourse ASC limit 10`);
    }
};