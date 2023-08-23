// Import required models and controller
const Student = require("../models/Student");
const Interview = require("../models/Interview");
const Result = require("../models/Result");
const Batch = require("../models/Batch");
const csvParserController = require("./csv_generation_controller");
const fs = require("fs-extra");

// Route to display student registration form
exports.getRegisterForm = async function (req, res) {
  try {
    // Fetch available batches from the database
    let batch = await Batch.find();

    // Render the "student_form" view with fetched batch data
    return res.render("student_form", {
      title: "Placement Cell | Registration",
      batch,
    });
  } catch (error) {
    req.flash("error", "Error getting student registration form");
    res.redirect("back");
  }
};

// Route to handle student registration form submission
exports.register = async function (req, res) {
  try {
    // Check if the student is already registered using their email
    let student = await Student.findOne({ email: req.email });

    if (student) {
      req.flash("error", "Student Already registered");
      return res.redirect("back");
    }

    // Create a new student in the database using the form data
    await Student.create(req.body);

    req.flash("success", "Student registered successfully");
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
};

// Route to fetch interviews for a specific student
exports.getInterviews = async function (req, res) {
  try {
    // Fetch the student's data, including interviews and results
    let student = await Student.findById(req.params.id)
      .populate("interviews")
      .populate("results");

    if (!student) {
      req.flash("error", "Student does not exist");
      return res.redirect("back");
    }

    // Fetch all interviews from the database
    let interviews = await Interview.find();

    // Render the "student_interview_page" view with the fetched student and interview data
    return res.render("student_interview_page", {
      student,
      interviews,
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
};

// Route to schedule an interview for a student
exports.scheduleInterview = async function (req, res) {
  try {
    // Fetch the student's data
    let student = await Student.findById(req.params.id);

    if (!student) {
      req.flash("error", "Student does not exist");
      return res.redirect("back");
    }

    // Check if the interview is already scheduled for the student
    let index = student.interviews.indexOf(req.body.interviewId);

    if (index != -1) {
      req.flash("error", "Interview Already Scheduled");
      return res.redirect("back");
    }

    // Fetch the interview data
    let interview = await Interview.findById(req.body.interviewId);
    if (!interview) {
      req.flash("error", "This Company has not scheduled any interviews");
      return res.redirect("back");
    }

    // Update student's interviews, interview's students, and create a new result
    student.interviews.push(req.body.interviewId);
    let result = await Result.create({
      student: req.params.id,
      interview: req.body.interviewId,
      status: "Scheduled",
    });
    interview.students.push(req.params.id);
    interview.results.push(result._id);
    student.results.push(result._id);

    // Save changes to the database
    await interview.save();
    await student.save();

    req.flash("success", "Interview Scheduled Successfully");
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
};

// Route to render student data in CSV format
module.exports.renderStudentDataInCSV = async function (req, res) {
  try {
    // Fetch all students with populated interviews and results
    let students = await Student.find().populate({
      path: "interviews",
      populate: {
        path: "results",
        model: "Result",
      },
    });

    if (students) {
      try {
        // Generate CSV file using the controller
        const filename = await csvParserController.generateCSVForStudent(
          students
        );
        const csvData = await fs.readFile(filename, "utf-8");

        // Set response headers for downloading the CSV
        res.setHeader("Content-Disposition", "attachment; filename=data.csv");
        res.set("Content-Type", "text/csv");

        // Send the CSV data in the response
        res.status(200).send(csvData);

        req.flash("success", "Data fetched successfully");
        return;
      } catch (error) {
        console.log(error);
        req.flash("error", "Error getting CSV data");
      }
    }

    return res.redirect("back");
  } catch (error) {
    console.log(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
};
