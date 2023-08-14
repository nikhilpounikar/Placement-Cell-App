const Batch = require("../models/Batch");
const Student = require("../models/Student");
const Inteview = require("../models/Interview");
const Employee = require("../models/Employee");

module.exports.home = async function (req, res) {
  try {

     // Checking for authorization
     
  if (!req.isAuthenticated()) {
      req.flash('error' , 'Please LogIn !');
      
      return res.redirect('/employee/sign-in');
  }
  console.log(req);
  // Fetching the user and review from the form
  let employee = await Employee.findById(req.user.id);

    console.log("Inside home controller");
    let students = await Student.find({})
      //.sort('-createdAt')
      .populate("batch")
      .populate("interviews")
      .populate('results');

    let interviews = await Inteview.find({});
    let batch = await Batch.find({});

    return res.render("dashboard", {
      title: "Placement | Home",
      students: students,
      interviews: interviews,
      batchList:batch,
      employee
    });
  } catch (err) {
    console.log("Error in home controller : ", err);
  }
};

