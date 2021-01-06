const db = require("../utils/db");
const config = require("../config/default.json");

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
  async getCoursebyCateID(condition, sortBy) {
    return await db.load(
      `select * from ${TBL_COURSE} where IdCategory=${condition} order by ${sortBy}`
    );
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
        left join headercategory
        on category.headercategoryid=headercategory.id
        where course.IdCourse = ${condition}
        group by course.idcourse`);
    return rows;
  },
  async searchByFulltext(text, sortby) {
    return await db.load(`select * from ${TBL_COURSE} where match(nameCourse) against('${text}')
         order by ${sortby}`);
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
  },
  async countByDomain(domainId) {
    let rows = await db.load(`select count(*) as total from ${TBL_COURSE} 
        inner join category
        on course.IdCategory = category.Id
        where category.Id in (select category.Id
            from headercategory
            inner join category
            on headercategory.Id = category.HeaderCategoryId
            where category.HeaderCategoryId = ${domainId})`);
    return rows[0].total;
  },

  async pageByDomain(domainId, offset) {
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
        where category.Id in (select category.Id
            from headercategory
            inner join category
            on headercategory.Id = category.HeaderCategoryId
            where category.HeaderCategoryId = ${domainId})
        group by course.IdCourse
        order by course.nOViews DESC limit ${config.pagination.limit} offset ${offset}`);
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
  async getDomainName(domainId) {
    return await db.load(`select *
            from headercategory
            where Id = ${domainId}`);
  },
  async getListCourseByIdUser(IdUser) {
    const rows = await db.load(`select *
                    from ${TBL_ENROLLEDCOURSE} 
                    left join ${TBL_COURSE}
                    on course.IdCourse = enrolledcourse.IdCourse
                    where IdUser = ${IdUser}`);
    return rows;
  },

  async getAllCourse() {
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
    group by course.IdCourse
    order by course.nOViews DESC limit 10`);
  },
  async countAllCourse() {
    let rows = await db.load(`select count(*) as total from ${TBL_COURSE} 
    inner join category
    on course.IdCategory = category.Id
    where category.Id in (select category.Id
        from headercategory
        inner join category
        on headercategory.Id = category.HeaderCategoryId)`);
    return rows[0].total;
  },

  async pageByAll(offset) {
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
        where category.Id in (select category.Id
            from headercategory
            inner join category
            on headercategory.Id = category.HeaderCategoryId)
        group by course.IdCourse
        order by course.nOViews DESC limit ${config.pagination.limit} offset ${offset}`);
  },
};