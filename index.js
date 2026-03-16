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
const port = process.env.PORT || 3000;

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// flash
app.use(cookieParser("ABCVSHSGY"));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

app.use(flash());

// biến global cho pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// static
app.use(express.static(`${__dirname}/public`));

// routes
routeAdmin(app);
route(app);

// start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});