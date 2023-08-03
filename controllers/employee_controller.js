const Employee = require("../models/Employee");

module.exports.register = async function (req, res) {
  try {
    //if user is already sign-in redirect to profile
    if (req.isAuthenticated()) {
      return res.redirect("/user/profile");
    }

    return res.render("user_sign_up", {
      // person:"Taliq"
      title: "Sign Up",
    });

    if (req.body.password !== req.body.confirm_password) {
      return res.status(422).json({
        message: "Password and Confirm password does not match",
      });
    }

    let employee = await Employee.findOne({ email: req.body.email });

    if (!employee) {
      await Employee.create(req.body);

      console.log("Employee Added Successfully");
      return this.createSession(req, res);
    } else {
      return res.status(403).json({
        message: "Employee Already Exits",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error Registering Employee",
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    let employee = await Employee.findOne({ email: req.body.email });

    if (employee) {
      return res.status(200).json(employee);
    } else {
      return res.status(422).json({
        message: "Invalid Username or Password",
      });
    }

    // passport authentication
  req.flash('success','Signed In Successfully!');
  return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Exception" });
  }
};
