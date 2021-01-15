const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const numeral = require('numeral');

module.exports = function (app) {
  app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: 'views/_partials',
    helpers: {
      section: hbs_sections(),
      format(val) {
        return numeral(val).format('0,0');
      },
      ifCondition:(a, operator, b , options) => {
        const operators = {
          '==':function(l, r) {return l == r;},
          '===': function (l, r) { return l === r; },
        };
        if(!operators[operator]){
          throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        }
        // else if (arguments.length < 2){
        //   throw new Error("Handlerbars Helper 'compare' needs 2 parameters and 1 operator");
        // }
        var res = operators[operator](a,b);
        if(res){
          return options.fn(this);
        }
        return options.inverse(this);
      }
    }
  }));
  app.set('view engine', 'hbs');
}