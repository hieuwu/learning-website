const courseModel = require('../models/course.model');

module.exports = {
  getLatestCourse: async (req, res) => {
    let listOfLatestCourse = [];
    let listOfMostViewedCourse = [];
    try {
      listOfLatestCourse = await courseModel.getLatest();
      listOfMostViewedCourse = await courseModel.getMostViewed();
    } catch (e) {
      console.log(e);
    }
    let latestPage1 = listOfLatestCourse.slice(0, 5);
    let latestPage2 = listOfLatestCourse.slice(5 ,listOfLatestCourse.length);
    let mostViewedPage1 = listOfMostViewedCourse.slice(0,5);
    let mostViewedPage2 = listOfMostViewedCourse.slice(5 ,listOfMostViewedCourse.length);

    res.render("vwHomepage/home", {
      latestPage1: latestPage1,
      latestPage2: latestPage2,
      mostViewedPage1:mostViewedPage1,
      mostViewedPage2:mostViewedPage2
    });
  },

  getMostViewedCourse:  (req, res) => {

  },


  getMostRegisteredCourse: (req, res) => {

  }
  
};
