const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const Employee = require("../models/Employee");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const employee = await Employee.findOne({ email: email });

        if (!employee || employee.password !== password) {
          req.flash("error", "Invalid Username/Password");
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, employee);
      } catch (err) {
        req.flash("error", "Error Finding User ==> Passport");
        console.log("Error Finding User ==> Passport");
        return done(err);
      }
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
  Employee.findById({ _id: id })
    .then((employee) => {
      return done(null, employee);
    })
    .catch((err) => {
      console.log("Error in finding the employee ===> Passport");
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
  return res.redirect("/employee/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  // if the user aunthenticated set user info for view
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
