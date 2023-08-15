const Employee = require("../models/Employee");
const Batch = require("../models/Batch");
const Student = require("../models/Student");
const Inteview = require("../models/Interview");

exports.signUp = function (req, res) {
  return res.render("employee_registration", {
    title: "Placement Cell | Registration",
  });
};
// Route to handle registration form submission
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect("back");
    }

    const newEmployee = new Employee({ name, email, password, role });
    await newEmployee.save();
    req.flash("success", "Thanks for Registration");
    // Log in the user and redirect to the dashboard
    req.login(newEmployee, err => {
      if (err) {
        return next(err);
      }
      return res.redirect('/'); // Change this to your dashboard route
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Interval Server Error");
    return res.redirect("back");
  }
};

exports.signIn = (req, res) => {
  res.render("employee_login", {
    title: "Emplyee Login",
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee || employee.password !== password) {
      req.flash("error", "Invalid email or password");
      return res.redirect("back");
    }

    

    // Store employee data in session or create a token for authentication
    req.flash("success", "Signed In Successfully!");
    
    return res.redirect("/");

  } catch (error) {
    console.error(error);
    req.flash("error", "Interval Server Error");
    return res.redirect("back");
  }
};

// responsible for sign-out
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error loging Out", err);
      return res.redirect("back");
    }
    req.flash("success", "You have logged out!");
    return res.render("dashboard", {
      title: "Placement | Home",
      employee
    });
  });
};

async function loadDashBoardData(){

  let students = await Student.find({})
      //.sort('-createdAt')
      .populate("batch")
      .populate("interviews")
      .populate("results");

    let  interviews = await Inteview.find({});
    let batch = await Batch.find({});

    return {
      students,
      interviews,
      batch
    }
}
