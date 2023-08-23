// Import required modules
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

// Create an instance of the Express application
const app = express();

const port = 8000;
const layouts = require("express-ejs-layouts");

// Import the database configuration
const db = require("./config/mongoose");

// Import passport local strategy
const passportLocal = require("./config/passport_local_strategy");

// Import bodyParser for parsing request bodies
const bodyParser = require('body-parser');

// Use JSON body parser for handling JSON data in requests
app.use(bodyParser.json());

// Set up static file serving for assets
app.use(express.static('./assets'));

// Set up EJS layouts for views
app.set("layout extractStyle ", true);
app.set("layout extractScripts ", true);
app.use(layouts);

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Set up various middleware

// Parse cookies using cookie-parser
app.use(cookieParser());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));

// Session setup using express-session
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    name: "Placement Cell",
    secret: 'nikhil_pounikar', // TODO: Change the secret before deployment
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

// Initialize passport for authentication
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

// Middleware to set the authenticated user in the request
const customMWare = require("./config/middleware");
app.use(passport.setAuthenticatedUser);

// Middleware for flash messages
const flash = require("connect-flash");
app.use(flash());
app.use(customMWare.setFlash);

// Set up the initial routing using index_routes
app.use("/", require("./routes/index_routes"));

// Start the server listener
app.listen(port, function (err) {
  if (err) {
    console.log("Error while starting the application: ", err);
    return;
  }

  console.log("Server started on port: ", port);
});
