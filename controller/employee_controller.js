// Import required models
const Employee = require("../models/Employee");
const Batch = require("../models/Batch");
const Student = require("../models/Student");
const Inteview = require("../models/Interview");

// Render the employee registration form
exports.signUp = function (req, res) {
  return res.render("employee_registration", {
    title: "Placement Cell | Registration",
  });
};

// Handle registration form submission
exports.register = async (req, res) => {
  try {
    // Extract user input data from the request body
    const { name, email, password, confirmPassword, role } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect("back");
    }

    // Create a new Employee instance with the provided data
    const newEmployee = new Employee({ name, email, password, role });

    // Save the new employee to the database
    await newEmployee.save();
    
    // Display success message using flash
    req.flash("success", "Thanks for Registration");

    // Log in the new employee and redirect to the dashboard
    req.login(newEmployee, err => {
      if (err) {
        return next(err);
      }
      return res.redirect('/'); // Change this to your dashboard route
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
};

// Render the employee login form
exports.signIn = (req, res) => {
  res.render("employee_login", {
    title: "Employee Login",
  });
};

// Handle employee login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find an employee with the provided email
    const employee = await Employee.findOne({ email });

    // Check if employee exists and password matches
    if (!employee || employee.password !== password) {
      req.flash("error", "Invalid email or password");
      return res.redirect("back");
    }

    // Display success message using flash
    req.flash("success", "Signed In Successfully!");
    
    return res.redirect("/");

  } catch (error) {
    // Handle errors
    console.error(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
};

// Handle employee sign-out
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error logging out", err);
      return res.redirect("back");
    }
    req.flash("success", "You have logged out!");
    return res.render("dashboard", {
      title: "Placement | Home",
    });
  });
};

// Function to load data for the dashboard
async function loadDashboardData() {
  // Fetch students, interviews, and batches from the database
  let students = await Student.find({})
    .populate("batch")
    .populate("interviews")
    .populate("results");

  let interviews = await Inteview.find({});
  let batch = await Batch.find({});

  // Return the fetched data
  return {
    students,
    interviews,
    batch
  };
}
