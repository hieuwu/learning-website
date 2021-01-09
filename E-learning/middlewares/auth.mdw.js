module.exports = {
  auth: (req, res, next) => {
    if (req.session.isAuth === false) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/account/login');
    }
    next();
  },
  isGuestOrUser: (req, res, next) => {
    if (req.session.isAuth === true){
      if (String(req.session.authUser.Permission) != "student") {
        throw Error('Access denied!');  
      }
    }
    next();
  },
  isUser: (req, res, next) => {
    if (String(req.session.authUser.Permission) != "student") {
      throw Error('Access denied!');  
    }
    next();
  },
  isTeacher: (req, res, next) => {
    if (String(req.session.authUser.Permission) != "teacher") {
      throw Error('Access denied!');
    }
    next();
  },
  
  isAdmin: (req, res, next) => {
    if (String(req.session.authUser.Permission) != "admin") {
      throw Error('Access denied!');
    }
    next();
  },
}