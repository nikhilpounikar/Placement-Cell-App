// Import required models
const Interview = require("../models/Interview");

// Route to display interview creation form
module.exports.getInterviewForm = async (req, res) => {
  try {
    const students = await Student.find(); // Fetch available students from the database
    const results = await Result.find(); // Fetch available results from the database
    res.render("interview-form", { students, results });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Route to display the interview creation form
module.exports.getInterviewForm = async (req, res) => {
  return res.render("interview_form");
};

// Route to handle interview creation form submission
module.exports.addInterview = async (req, res) => {
  try {
    // Check if an interview with the same company and date already exists
    let interview = await Interview.findOne({
      companyName: req.body.companyName,
      date: req.body.date,
    });

    if (interview) {
      req.flash("error", "Interview already scheduled on this date");
      return res.redirect("back");
    }

    // Create a new interview in the database using the form data
    await Interview.create(req.body);

    req.flash("success", "Interview Scheduled Successfully");
    return res.redirect("/interview/view");
  } catch (error) {
    console.error(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
};

// Route to fetch and display the list of interviews
module.exports.getInterviewList = async function (req, res) {
  try {
    // Fetch all interviews from the database
    let interviews = await Interview.find();

    if (!interviews) {
      req.flash("success", "Data is not available");
      return res.redirect("back");
    }

    // Render the "interview_table" view with the fetched interview data
    return res.render("interview_table", {
      interviews: interviews,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
};

// Route to fetch and display the list of students for a specific interview
module.exports.getStudentList = async function (req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      req.flash("error", "Interview Reference Missing");
      return res.redirect('back');
    }

    // Fetch the interview data with associated students and results
    let interview = await Interview.findById(id)
      .populate({
        path: 'students',
        populate: {
          path: "batch", // Populate the 'batch' field in 'students'
          model: "Batch", // Use the 'Batch' model for populating 'batch'
        },
      })
      .populate('results');
    
    if (!interview) {
      req.flash("error", "Interview Data not available.");
      return res.redirect("back");
    }

    // Render the "student_table_by_interview" view with the fetched interview and student data
    return res.render("student_table_by_interview", {
      interview
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
};
