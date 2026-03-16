const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();

const database = require("./config/database");
const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.router");
const route = require("./routes/client/index.route");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

database.connect();

const app = express();

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(cookieParser("ABCVSHSGY"));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

routeAdmin(app);
route(app);

module.exports = app;