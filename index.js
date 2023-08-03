const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const layouts = require("express-ejs-layouts");
const MongoStore = require('connect-mongodb-session')(session)

const app = express();

const port = 8000;
const db = require("./config/mongoose");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./assets"));
app.set("layout extractStyle", true); // Remove the space after "extractStyle"
app.set("layout extractScripts", true); // Remove the space after "extractScripts"
app.use(layouts);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes/index"));

app.use(
  session({
    name: "Employee Review",
    secret: "monogConnection",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db.connection, // Use db.connection instead of just db
        autoRemove: "disable",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.listen(port, function (err) {
  if (err) {
    console.log("Error while starting an application: ", err);
    return;
  }
  console.log("Server Started on port:", port);
});
