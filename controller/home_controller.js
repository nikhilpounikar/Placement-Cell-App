const Batch = require("../models/Batch");
const Student = require("../models/Student");
const Inteview = require("../models/Interview");

module.exports.home = async function (req, res) {
  try {
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
    });
  } catch (err) {
    console.log("Error in home controller : ", err);
  }
};

