const Student = require("../models/Student");
const Interview = require("../models/Interview");
const Result = require("../models/Result");
exports.getRegisterForm = function (req, res) {
  return res.render("student_form", { title: "Placement Cell | Registration" });
};

exports.register = async function (req, res) {
  try {
    let student = await Student.findOne({ email: req.email });

    if (student) {
      req.flash("error", "Student Already registered");
      return res.redirect("back");
    }

    await Student.create(req.body);

    req.flash("success", "Student registered successfully");
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
};

exports.getInterviews = async function (req, res) {
  try {
    let student = await Student.findById(req.params.id).populate("interviews").populate('results');

    if (!student) {
      req.flash("error", "Student does not exits");
      return res.redirect("back");
    }

    let interviews = await Interview.find();

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

exports.scheduleInterview = async function (req, res) {
  try {
    let student = await Student.findById(req.params.id);
    
    if (!student) {
      req.flash("error", "Student does not exits");
      return res.redirect("back");
    }

    let index = student.interviews.indexOf(req.body.interviewId);

    if (index != -1) {
      req.flash("error", "Interview Already Scheduled");
      return res.redirect("back");
    }

    let interview = await Interview.findById(req.body.interviewId);
    if (!interview) {
        req.flash("error", "This Company has not scheduled any interviews");
        return res.redirect("back");
    }

    student.interviews.push(req.body.interviewId);

    let result = await Result.create({
      student: req.params.id,
      interview: req.body.interviewId,
      status: "Scheduled",
    });

    interview.results.push(result._id);
    student.results.push(result._id);

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
