const db = require("../utils/db");
const config = require("../config/default.json");

const TBL_COURSE = "course";
const TBL_ENROLLEDCOURSE = "enrolledcourse";
const TBL_CHAPTER = "chapter";
const TBL_LESSON = "lesson"
module.exports = {
    async all() {
        return await db.load(`select * from ${TBL_COURSE}`);
    },

    async getLatest() {
        // return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,
        //                             course.nameCourse,category.NameCategory, course.Price, course.SaleCost, course.title
        //                             from ${TBL_COURSE}
        //                             left join user_profile
        //                             on course.IdTeacher = user_profile.IdUser
        //                             inner join category
        //                             on course.IdCategory = category.Id
        //                             order by IdCourse DESC limit 10`);
        return await db.load(`select 	course.IdCourse, course.Description, course.nameCourse, course.Price, course.avgRate,
                        course.SaleCost, course.title, category.NameCategory, count(enrolledcourse.IdUser) as numRating
                        from ${TBL_COURSE}
                        left join user_profile on course.IdTeacher = user_profile.IdUser
                        inner join category on course.IdCategory = category.Id
                        left join enrolledcourse on course.IdCourse = enrolledcourse.IdCourse 
                        and enrolledcourse.rateStar != 0
                        where course.isDeleted = false
                        group by 
                        course.IdCourse
                        order by
                        course.IdCourse desc limit 10`);
    },

    async getMostViewed() {
        // return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,
        //                         course.nameCourse, category.NameCategory, course.Price, course.SaleCost,course.title,
        //                         course.createdTime, course.nOViews
        //                         from ${TBL_COURSE}
        //                         left join user_profile
        //                         on course.IdTeacher = user_profile.IdUser
        //                         inner join category
        //                         on course.IdCategory = category.Id
        //                         order by course.nOViews DESC limit 10`);
        return await db.load(`select course.IdCourse, FullName, course.nameCourse, course.Description,course.avgRate,
                            course.nameCourse, category.NameCategory, course.Price, course.SaleCost,course.title,
                            course.createdTime, course.nOViews, count(enrolledcourse.IdUser) as numRating
                            from ${TBL_COURSE} 
                            left join user_profile on course.IdTeacher = user_profile.IdUser
                            inner join category on course.IdCategory = category.Id
                            left join enrolledcourse on course.IdCourse = enrolledcourse.IdCourse
                            and enrolledcourse.rateStar != 0
                            where course.isDeleted = false
                            group by course.IdCourse, course.nOViews
                            order by course.nOViews DESC limit 10`);
    },

    async getMostRegistered() {
        // return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,
        //                         course.nameCourse, category.NameCategory, course.Price, course.SaleCost,course.title,
        //                         course.createdTime, course.nOViews
        //                         from ${TBL_COURSE}
        //                         left join user_profile
        //                         on course.IdTeacher = user_profile.IdUser
        //                         inner join category
        //                         on course.IdCategory = category.Id
        //                         order by course.nOViews DESC limit 10`);
        return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,course.avgRate,
                            course.nameCourse, category.NameCategory, course.Price, course.SaleCost,course.title,
                            course.createdTime, course.nOViews,course.subscribe, count(enrolledcourse.IdUser) as numRating
                            from ${TBL_COURSE} 
                            left join user_profile on course.IdTeacher = user_profile.IdUser
                            inner join category on course.IdCategory = category.Id
                            left join enrolledcourse on course.IdCourse = enrolledcourse.IdCourse
                            and enrolledcourse.rateStar != 0
                            where course.isDeleted = false
                            group by course.IdCourse, course.nOViews
                            order by course.subscribe DESC limit 10`);
    },
    async countCoursebyCateID(condition) {
        return await db.load(
            `select count(*) as count from ${TBL_COURSE} where IdCategory in (${condition}) and isDeleted = false`
        );
    },
    async getFullInformationByCate(condition, sortby, offset) {
        const rows = await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,
        course.nameCourse, category.NameCategory, course.Price, course.SaleCost,course.title,
        course.createdTime, course.nOViews,course.avgRate ,course.subscribe, count(enrolledcourse.IdUser) as numRating
        from ${TBL_COURSE} 
        left join user_profile
        on course.IdTeacher = user_profile.IdUser
        inner join category
        on course.IdCategory = category.Id
        left join headercategory
        on category.headercategoryid=headercategory.id
        left join enrolledcourse on course.IdCourse = enrolledcourse.IdCourse
        where course.IdCategory in (${condition}) and course.isDeleted = false
        group by course.IdCourse
        order by ${sortby} limit ${config.pagination.limit} offset ${offset}`);
        return rows;
    },
    async getFullInformationByID(condition, sortby, offset) {
        const rows = await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,course.title,
        course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime,
        course.nOViews, course.avgRate,count(enrolledcourse.IdUser) as numRating
        from ${TBL_COURSE} 
        left join user_profile
        on course.IdTeacher = user_profile.IdUser
        inner join category
        on course.IdCategory = category.Id
        left join headercategory
        on category.headercategoryid=headercategory.id
        left join enrolledcourse on course.IdCourse = enrolledcourse.IdCourse
        where course.IdCourse in (${condition}) and course.isDeleted = false
        group by course.IdCourse
        order by ${sortby} limit ${config.pagination.limit} offset ${offset}`);
        return rows;
    },
    async searchByFulltext(text, sortby) {
        return await db.load(`select * from ${TBL_COURSE} where match(nameCourse) against('${text}') and course.isDeleted = false
         order by ${sortby}`);
    },
    async pageBycat(catId, offset) {
        // return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,course.title,
        //     course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime, course.nOViews,
        //     count(chapter.IdChapter) as numOfChapters
        //     from ${TBL_COURSE}
        //     left join user_profile on course.IdTeacher = user_profile.IdUser
        //     inner join category on course.IdCategory = category.Id
        //     inner join chapter on course.IdCourse = chapter.idCourse
        //     where category.Id= ${catId}
        //     group by course.IdCourse
        //     order by course.nOViews DESC limit ${config.pagination.limit} offset ${offset}`);
        return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,course.title,
        course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime,
        course.nOViews, course.avgRate, count(enrolledcourse.IdUser) as numRating
        from ${TBL_COURSE} 
        left join user_profile on course.IdTeacher = user_profile.IdUser
        inner join category on course.IdCategory = category.Id
        left join enrolledcourse on course.IdCourse = enrolledcourse.IdCourse
        and enrolledcourse.rateStar != 0
        where category.Id= ${catId} and course.isDeleted = false
        group by course.IdCourse
        order by course.nOViews DESC limit ${config.pagination.limit} offset ${offset}`);
    },
    async countByCat(catId) {
        let rows = await db.load(`select count(*) as total from ${TBL_COURSE} 
        inner join category
        on course.IdCategory = category.Id
        where category.Id= ${catId} and course.isDeleted = false`);
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
            where category.HeaderCategoryId = ${domainId}) and course.isDeleted = false`);
        return rows[0].total;
    },

    async pageByDomain(domainId, offset) {
        // return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,course.title,
        //     course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime, course.nOViews,
        //     count(chapter.IdChapter) as numOfChapters
        //     from ${TBL_COURSE}
        //     left join user_profile
        //     on course.IdTeacher = user_profile.IdUser
        //     inner join category
        //     on course.IdCategory = category.Id
        //     inner join chapter
        //     on course.IdCourse = chapter.idCourse
        //     where category.Id in (select category.Id
        //         from headercategory
        //         inner join category
        //         on headercategory.Id = category.HeaderCategoryId
        //         where category.HeaderCategoryId = ${domainId})
        //     group by course.IdCourse
        //     order by course.nOViews DESC limit ${config.pagination.limit} offset ${offset}`);
        return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,course.title,
        course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime,
        course.nOViews, course.avgRate, count(enrolledcourse.IdUser) as numRating
        from ${TBL_COURSE} 
        left join user_profile on course.IdTeacher = user_profile.IdUser
        inner join category on course.IdCategory = category.Id
        left join enrolledcourse on course.IdCourse = enrolledcourse.IdCourse
        and enrolledcourse.rateStar != 0
        where category.Id in (select category.Id
            from headercategory
            inner join category
            on headercategory.Id = category.HeaderCategoryId
            where category.HeaderCategoryId = ${domainId}) and course.isDeleted = false
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
        const rows = await db.load(`select 	course.IdCourse, course.Description, course.nameCourse, course.Price, course.avgRate,
                        course.SaleCost, course.title, category.NameCategory, count(enrolledcourse.IdUser) as numRating
                        from ${TBL_COURSE}
                        left join user_profile on course.IdTeacher = user_profile.IdUser
                        inner join category on course.IdCategory = category.Id
                        left join enrolledcourse on course.IdCourse = enrolledcourse.IdCourse
                        where course.IdCategory = ${IdCategory} AND course.IdCourse != ${IdCourse} 
                        and course.isDeleted = false
                        group by 
                        course.IdCourse
                        order by
                        course.IdCourse desc limit 5`);
        return rows;
    },
    async getListRating(id) {
        const rows = await db.load(`select *
                    from ${TBL_ENROLLEDCOURSE} 
                    left join user_profile
                    on ${TBL_ENROLLEDCOURSE}.IdUser = user_profile.IdUser
                    where IdCourse = ${id}`);
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
                    inner join user_profile on course.IdTeacher = user_profile.IdUser
                    inner join category on course.IdCategory = category.Id
                    where enrolledcourse.IdUser = ${IdUser} and course.isDeleted = false`);
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
    where course.isDeleted = false
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
        on headercategory.Id = category.HeaderCategoryId) and course.isDeleted = false`);
        return rows[0].total;
    },

    async pageByAll(offset) {
        return await db.load(`select course.IdCourse, FullName, nameCourse, course.Description,course.title,
        course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime, course.nOViews,course.isDeleted,
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

    async deleteCourse(IdCourse) {
        const condition = { IdCourse: IdCourse };
        const entity = { isDeleted: true };
        return await db.patch(entity, condition, TBL_COURSE);
    },

    async enableCourse(IdCourse) {
        const condition = { IdCourse: IdCourse };
        const entity = { isDeleted: false };
        return await db.patch(entity, condition, TBL_COURSE);
    },

    async updateCourse(IdCourse, course) {
        const condition = { IdCourse: IdCourse };
        const entity = course;
        return await db.patch(entity, condition, TBL_COURSE);
    },
    async getNumberRatingsCourse(IdCourse) {
        const rows = await db.load(`select count(IdUser) as numberRating
                    from ${TBL_ENROLLEDCOURSE} 
                    where IdCourse = ${IdCourse}`);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    },
    async coursePageByTeacherID(TeacherId, sortBy, offset) {
        return await db.load(`select ${TBL_COURSE}.*,category.NameCategory,headercategory.HeaderNameCategory,count(chapter.idChapter) as NoChapter
        from ${TBL_COURSE} right join user_profile on ${TBL_COURSE}.IdTeacher=user_profile.IdUser
        left join category on ${TBL_COURSE}.IdCategory=category.Id left join headercategory on category.HeaderCategoryID=headercategory.Id
        left join chapter on ${TBL_COURSE}.IdCourse=chapter.idCourse
        where user_profile.IdUser=${TeacherId} and course.isDeleted = false
        group by ${TBL_COURSE}.idCourse
        order by ${sortBy},${TBL_COURSE}.nOViews DESC limit ${config.pagination.limit} offset ${offset}`);
    },
    async countCourseByTeacherID(TeacherId) {
        let rows = await db.load(`select count(*) as total
        from ${TBL_COURSE} right join user_profile on ${TBL_COURSE}.IdTeacher=user_profile.IdUser
        left join category on ${TBL_COURSE}.IdCategory=category.Id left join headercategory on category.HeaderCategoryID=headercategory.Id
        where user_profile.IdUser=${TeacherId} and course.isDeleted = false`);
        return rows[0].total;
    },
    async checkIsJoinCourse(IdUser, IdCourse) {
        const rows = await db.load(`select *
                    from ${TBL_ENROLLEDCOURSE} 
                    where IdUser = ${IdUser} and IdCourse = ${IdCourse}`);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    },
    async getListLessonByCourseId(IdCourse) {
        const rows = await db.load(`select *
                    from chapter 
                    left join lesson on lesson.idChapter = chapter.IdChapter
                    where IdCourse = ${IdCourse}`);
        return rows;
    },
    async getHighlightCourses() {
        return await db.load(`select course.IdCourse, FullName, course.nameCourse, course.Description,course.avgRate,
        course.nameCourse, category.NameCategory, course.Price, course.SaleCost,course.title,course.subscribe,
        course.createdTime, course.nOViews, count(enrolledcourse.IdUser) as numRating
        from ${TBL_COURSE} 
        left join user_profile on course.IdTeacher = user_profile.IdUser
        inner join category on course.IdCategory = category.Id
        left join enrolledcourse on course.IdCourse = enrolledcourse.IdCourse
        and enrolledcourse.rateStar != 0
        where course.isDeleted = false and DATEDIFF(now(), course.createdTime) <= 7
        group by course.IdCourse, course.nOViews
        order by course.avgRate DESC limit 3`);
    },
    addCourse(entity) {
        return db.add(entity, TBL_COURSE);
    },
    async getListChapterByCourseId(IdCourse) {
        const rows = await db.load(`select *
                    from chapter 
                    where IdCourse = ${IdCourse}`);
        return rows;
    },
    addChapter(entity) {
        return db.add(entity, TBL_CHAPTER);
    },
    addLesson(entity) {
        return db.add(entity, TBL_LESSON);
    },
    async getChapterByCourse(id) {
        let rows = await db.load(`select * from ${TBL_CHAPTER} where idCourse='${id}' order by IdChapter desc`);
        if (rows.length == 0) {
            rows = null;
        }
        return rows;
    },
    async getLessonByChapter(id) {
        return await db.load(`select * from ${TBL_LESSON} where idChapter='${id}'order by idLesson desc`);
    },
    async getNewCourseByIDTeacher(id) {
        return await db.load(`select * from ${TBL_COURSE} where IdTeacher='${id}'order by IdCourse desc`);
    },
};