const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();

const database = require("./config/database");
const systemConfig = require("./config/system");

const path = require("path");

const routeAdmin = require("./routes/admin/index.router");
const route = require("./routes/client/index.route");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

const app = express();

// 🔥 MIDDLEWARE
app.use(methodOverride("_method"));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

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

//tinyMCE
app.use("/tinymce", express.static(`${__dirname}/node_modules/tinymce`));
//end tinyMCE

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

// 🔥 ROUTES
routeAdmin(app);
route(app);

// 🔥 START SERVER (QUAN TRỌNG NHẤT)
const startServer = async () => {
  await database.connect();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};
// Thêm vào cuối index.js, trước startServer()
process.on("unhandledRejection", (reason, promise) => {
  console.error("🔥 Unhandled Rejection at:", promise);
  console.error("🔥 Reason:", reason);
});

startServer();