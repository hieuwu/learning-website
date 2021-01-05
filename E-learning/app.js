var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var app = express();
var dotenv = require('dotenv').config();
var app1 = express();

app.use("/public", express.static("public"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true,
    })
);

require("./middlewares/view.mdw")(app, 0);
require("./middlewares/session.mdw")(app, 0);
require("./middlewares/locals.mdw")(app, 0);
require("./middlewares/routes.mdw")(app, 0);
require("./middlewares/error.mdw")(app, 0);
const PORT = 3002;
require("./middlewares/view_manage.mdw")(app1);
require("./middlewares/session.mdw")(app1);
require("./middlewares/locals.mdw")(app1);
require("./middlewares/routes.mdw")(app1, 1);
require("./middlewares/error.mdw")(app1);
const PORT1 = 3000;

app.listen(PORT, function() {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
app1.listen(PORT1, function() {
    console.log(`Example app listening at http://localhost:${PORT1}`);
});