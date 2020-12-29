const courseModel = require('../models/course.model');

module.exports = {
  getLatestCourse: async (req, res) => {
    let listOfLatestCourse = [];
    try {
      listOfLatestCourse = await courseModel.getLatest();
    } catch (e) {
      console.log(e);
    }
    let latestPage1 = listOfLatestCourse.slice(0, 5);
    let latestPage2 = listOfLatestCourse.slice(5 ,listOfLatestCourse.length);


    res.render("vwHomepage/home", {
      latestPage1: latestPage1,
      latestPage2: latestPage2,
    });
  },

  getMostViewedCourse:  (req, res) => {

  },


  getMostRegisteredCourse: (req, res) => {

  }
  
};
