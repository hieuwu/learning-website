module.exports = {
  auth: (req, res, next) => {
    if (req.session.isAuth === false) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/account/login');
    }
    next();
  },
  isUser: (req, res, next) => {
    if (String(req.session.isAuth.Permission) === "student") {
      const url = req.originalUrl || '/';
      return res.redirect(url);
    }
    next();
  },
  isTeacher: (req, res, next) => {
    if (String(req.session.isAuth.Permission) === "teacher") {
      const url = req.originalUrl || '/';
      return res.redirect(url);
    }
    next();
  },
  
  isAdmin: (req, res, next) => {
    if (String(req.session.isAuth.Permission) === "admin") {
      const url = req.originalUrl || '/';
      return res.redirect(url);
    }
    next();
  },
}