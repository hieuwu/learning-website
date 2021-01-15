const db = require("../utils/db");
const TBL_WISHLIST = "wishlist";
module.exports = {
  async getWishListByIdUser(IdUser) {
    const rows = await db.load(
            `select * from ${TBL_WISHLIST} 
            left join course
            on wishlist.IdCourse = course.IdCourse
            inner join user_profile
            on course.IdTeacher = user_profile.IdUser
            inner join category
            on course.IdCategory = category.Id
            where wishlist.IdUser = ${IdUser}`
    );
    return rows;
  },
  async checkCourseWishList(IdUser, IdCourse) {
    const rows = await db.load(
      `select * from ${TBL_WISHLIST} where IdUser = ${IdUser} and IdCourse = ${IdCourse}`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  add(entity) {
    return db.add(entity, TBL_WISHLIST);
  },
  del(IdUser, IdCourse) {
    const condition_1 = { IdUser: IdUser };
    const condition_2 = { IdCourse: IdCourse };
    return db.delWith2Key(condition_1, condition_2, TBL_WISHLIST);
  },
};
