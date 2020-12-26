module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('home');
  });
  app.use('/account', require('../routes/front/account.route'));
}