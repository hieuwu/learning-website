module.exports = function (app) {
  app.get("/", function (req, res) {
    let courses = [
      {
        name: "Lập trình game cơ bản",
        category: "Lập trình web",
        teacher: "Khoa Trần",
        rating: 5,
        image: "https://i.imgur.com/vHNHZCC.jpg",
      },
      {
        name: "Lập trình di động nâng cao",
        category: "Lập trình di động",
        teacher: "Nhân Trần",
        rating: 5,
        image: "https://i.imgur.com/vHNHZCC.jpg",
      },
      {
        name: "Lập trình Android",
        category: "Lập trình di động",
        teacher: "Hiếu Vũ",
        rating: 5,
        image: "https://i.imgur.com/vHNHZCC.jpg",
      },
      {
        name: "Lập trình Website cơ bản",
        category: "Lập trình web",
        teacher: "Khoa Trần",
        rating: 5,
        image: "https://i.imgur.com/vHNHZCC.jpg",
      },
    ];
    res.render("vwHomepage/home", {
      courses: courses,
    });
  });
  app.use("/account", require("../routes/front/account.route"));
};
