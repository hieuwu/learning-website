module.exports = function (app) {
  app.get("/", function (req, res) {
    let courses = [
      {
        name: "Lập trình game cơ bản",
        category: "Lập trình web",
        teacher: "Khoa Trần",
        rating: 5,
        image: "",
      },
      {
        name: "Lập trình di động nâng cao",
        category: "Lập trình di động",
        teacher: "Nhân Trần",
        rating: 5,
        image: "",
      },
      {
        name: "Lập trình Android",
        category: "Lập trình di động",
        teacher: "Hiếu Vũ",
        rating: 5,
        image: "",
      },
      {
        name: "Lập trình Website cơ bản",
        category: "Lập trình web",
        teacher: "Khoa Trần",
        rating: 5,
        image: "",
      },
      {
        name: "Lập trình Website nâng cao",
        category: "Lập trình web",
        teacher: "Ngọc Nguyễn",
        rating: 5,
        image: "",
      },
      {
        name: "Lập trình iOS",
        category: "Lập trình di động",
        teacher: "Lộc Linh",
        rating: 5,
        image: "",
      },
      {
        name: "Lập trình game nâng cao",
        category: "Lập trình web",
        teacher: "Hoàng Đỗ",
        rating: 5,
        image: "",
      },
    ];
    res.render("vwHomepage/home", {
      courses: {
        name: "Lập trình game nâng cao",
        category: "Lập trình web",
        teacher: "Hoàng Đỗ",
        rating: 5,
        image: "",
      },
    });
  });
  app.use("/account", require("../routes/front/account.route"));
};
