const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const Employee = require("../models/Employee");

//authentication using passprt
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      try {
        let employee = await Employee.findOne({ email: email });

        if (!employee || employee.password != password) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        req.flash("error", "Internal Server Error");
        console.log(error);
        return done(error, false);
      }
    }
  )
);

// serialise the user to decide which key is to be kept in cookies
// it is responsible for managing the cookie
passport.serializeUser(function (employee, done) {
  done(null, employee.id);
});

// deserialising the user key in cookie
passport.deserializeUser(async function (id, done) {

    try {
        let employee = await Employee.findById({_id:id});

        if(!employee){
            return done(null, false);
        }

        return done(null, employee);
    } catch (error) {
        return done(error,false);
    }

});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user aunthenticated allow to navigate anywhere
  if (req.isAuthenticated()) {
    return next();
  }

  // if user not authenticated navigate the user to sign-in
  return res.redirect("/employee/sign_in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  // if the user aunthenticated set user info for view
  if (req.isAuthenticated()) {
    //req.user contains current signed-in user
    // setting this information for view
    res.locals.employee = req.employee;
  }

  next();
};

module.exports = passport;
