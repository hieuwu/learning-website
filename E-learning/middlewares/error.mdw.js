module.exports = function(app){
    app.use(function (req, res) {
      let url = "/";
      if(req.session.isAuth === false){
        url = "/";
      }else{
        if (String(req.session.authUser.Permission) === "student"){
          url = "/"
        }else if(String(req.session.authUser.Permission) === "teacher"){
          url = "/teacher/"
        }else{
          url = "/admin/"
        }
      }
        res.render('404', {
          layout: false,
          url: url,
        })
      });
      // default error handler
      app.use(function (err, req, res, next) {
        let url = "/";
      if(req.session.isAuth === false){
        url = "/";
      }else{
        if (String(req.session.authUser.Permission) === "student"){
          url = "/"
        }else if(String(req.session.authUser.Permission) === "teacher"){
          url = "/teacher/"
        }else{
          url = "/admin/"
        }
      }
        res.render('500', {
          layout: false,
          url: url,
        })
      })
}