var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var app = express();
var dotenv = require('dotenv').config();

app.use("/public", express.static("public"));
app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true,
    })
);

require("./middlewares/view.mdw")(app);
require("./middlewares/session.mdw")(app);
require("./middlewares/locals.mdw")(app);
require("./middlewares/routes.mdw")(app);
require("./middlewares/error.mdw")(app);
const PORT = 3000;

app.listen(PORT, function() {
    console.log(`Example app listening at http://localhost:${PORT}`);
});