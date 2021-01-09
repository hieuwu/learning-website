const db = require("../utils/db");
const TBL_ENROLLEDCOURSE = "enrolledcourse";
module.exports = {
    addRating(IdUser, IdCourse, rateStar, Comments) {
        const condition_1 = {IdUser: IdUser};
        const condition_2 = {IdCourse: IdCourse};
        const entity = { rateStar: rateStar, Comments: Comments };
        return db.patchWith2Key(entity, condition_1, condition_2, TBL_ENROLLEDCOURSE);
      },
  };