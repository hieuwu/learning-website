const courseModel = require("../models/course.model");
const config = require("../config/default.json");
module.exports = {
  allByCategory: async (req, res) => {
    let page = +req.query.page || 1;
    if (page == 0) page = 1;
    let offset = (page - 1) * config.pagination.limit;
    let listOfCourses = await courseModel.pageBycat(
      req.params.categoryId,
      offset
    );
    const total = await courseModel.countByCat(req.params.categoryId);
    let nPages = Math.ceil(total / config.pagination.limit);
    let page_items = [];
    for (i = 1; i <= nPages; i++) {
      const item = {
        value: i,
      };
      page_items.push(item);
    }
    res.render("vwCourseByCategory/byCategory", {
      listOfCourses: listOfCourses,
      page_items: page_items,
      can_go_next: page < nPages,
      can_go_prev: page > 1,
      prev_value: page - 1,
      next_value: page + 1,
      title: listOfCourses[0].NameCategory,
    });
  },

  allByDomain: async (req, res) => {
    let page = +req.query.page || 1;
    if (page == 0) page = 1;
    let offset = (page - 1) * config.pagination.limit;
    let title = await courseModel.getDomainName(req.params.id);
    console.log("title:", title[0].HeaderNameCategory);
    let listOfCourses = await courseModel.pageByDomain(req.params.id, offset);
    const total = await courseModel.countByDomain(req.params.id);
    let nPages = Math.ceil(total / config.pagination.limit);
    let page_items = [];
    for (i = 1; i <= nPages; i++) {
      const item = {
        value: i,
      };
      page_items.push(item);
    }
    res.render("vwCourseByCategory/byDomain", {
      listOfCourses: listOfCourses,
      page_items: page_items,
      can_go_next: page < nPages,
      can_go_prev: page > 1,
      prev_value: page - 1,
      next_value: page + 1,
      title:  title[0].HeaderNameCategory,
    });
  },
};
