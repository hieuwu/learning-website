const db = require("../utils/db");

const TBL_COURSE = "course";
const TBL_ENROLLEDCOURSE = "enrolledcourse";
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

  async single(id) {
    const rows = await db.load(`select *
                    from ${TBL_COURSE} 
                    left join user_profile
                    on course.IdTeacher = user_profile.IdUser
                    inner join category
                    on course.IdCategory = category.Id
                    inner join headercategory
                    on category.HeaderCategoryID = headercategory.id
                    where IdCourse = ${id}`);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async getCourseByIdCategory(IdCategory, IdCourse) {
    const rows = await db.load(`select *
                    from ${TBL_COURSE} 
                    where IdCategory = ${IdCategory} AND IdCourse != ${IdCourse}`);
    return rows;
  },
  async getListRating(id) {
    const rows = await db.load(`select *
                    from ${TBL_ENROLLEDCOURSE} 
                    left join user_profile
                    on ${TBL_ENROLLEDCOURSE}.IdUser = user_profile.IdUser
                    where IdCourse = ${id}`);
    if (rows.length === 0) {
      return null;
    }
    return rows;
  },
};
