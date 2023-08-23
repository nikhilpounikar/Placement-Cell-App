// Import required models
const Batch = require("../models/Batch");
const Student = require("../models/Student");
const Inteview = require("../models/Interview");
const Employee = require("../models/Employee");

// Controller function to render the dashboard home page
module.exports.home = async function (req, res) {
  try {
    // Check if the user is authenticated (logged in)
    if (!req.isAuthenticated()) {
      // If not authenticated, show an error flash message and redirect to the login page
      req.flash('error' , 'Please Log In!');
      return res.redirect('/employee/sign-in');
    }

    // Fetch the currently logged-in employee's data
    let employee = await Employee.findById(req.user.id);

    // Fetch all students from the database, populating their related batch, interviews, and results
    let students = await Student.find({})
      .populate("batch")
      .populate("interviews")
      .populate('results');

    // Fetch all interviews from the database
    let interviews = await Inteview.find({});

    // Fetch all batches from the database
    let batch = await Batch.find({});

    // Render the "dashboard" view with fetched data and user information
    return res.render("dashboard", {
      title: "Placement | Home",
      students: students,
      interviews: interviews,
      batchList: batch,
      employee
    });
  } catch (err) {
    console.log("Error in home controller: ", err);
  }
};
