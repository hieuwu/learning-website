const session = require('express-session');
module.exports = function (app) {
    app.set('trust proxy', 1);
    app.use(session({
      secret: 'SECRET_KEY',
      resave: false,
      saveUninitialized: true,
      cookie: {
        //secure: true
      }
    }));
}