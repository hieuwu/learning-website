
module.exports = function (app) {
  app.use(async function (req, res, next) {
    if (typeof (req.session.isAuth) === 'undefined') {
      req.session.isAuth = false;
    }

    res.locals.isAuth = req.session.isAuth;
    res.locals.authUser = req.session.authUser;
    next();
  })


}