const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

const app = express();

const port = 8000;
const layouts = require("express-ejs-layouts");
const env = require("./config/environment");

const db = require("./config/mongoose");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const passportJwt = require("./config/passport_jwt");
//get mongostore config
const MongoStore = require("connect-mongo")(session);

// get sass middleware
const sassMiddleware = require("node-sass-middleware");

const flash = require("connect-flash");
const customMWare = require("./config/middleware");

if (env.name != "production") {
  // this sassMiddleware should be used before server startup so that it could compiled int0 css prior loading views
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(env.asset_path));
//puts styles and script to respective postion i.e in head and end the body respectively
app.set("layout extractStyle ", true);
app.set("layout extractScripts ", true);
// Layouts Should be rendered before routing
app.use(layouts);

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is being used to store session cookie in db
app.use(
  session({
    name: "Placement Cell",
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },

    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disable",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMWare.setFlash);

// let middleware handle initial routing
app.use("/", require("./routes/index_routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error while starting an application : ", err);
    return;
  }

  console.log("Server Started on port : ", port);
});
