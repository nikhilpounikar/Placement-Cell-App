const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

//authentication using passprt
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback:true
    },
    function (req,email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            req.flash('error',"Invalid Username/Password");
            console.log("Invalid Username/Password");
            return done(null, false);
          }
          // if (!user.verifyPassword(password)) {
          //   return done(null, false);
          // }
          return done(null, user);
        })
        .catch((err) => {
          req.flash('error',"Eror Finding User ==> Passport");
          console.log("Eror Finding User ==> Passport");
          return done(err);
        });
    }
  )
);

// serialise the user to decide which key is to be kept in cookies
// it is responsible for managing the cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialising the user key in cookie
passport.deserializeUser(function (id, done) {
  User.findById({ _id: id })
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log("Error in finding the user ===> Passport");
      return done(err);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user aunthenticated allow to navigate anywhere
  if (req.isAuthenticated()) {
    return next();
  }

  // if user not authenticated navigate the user to sign-in
  return res.redirect("/user/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  // if the user aunthenticated set user info for view
  if (req.isAuthenticated()) {
    //req.user contains current signed-in user
    // setting this information for view
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
