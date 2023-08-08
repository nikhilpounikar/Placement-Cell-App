const Interview = require("../models/Interview");

// Route to display interview creation form
module.exports.getInterviewForm =  async (req, res) => {
  try {
    const students = await Student.find(); // Fetch available students from the database
    const results = await Result.find(); // Fetch available results from the database
    res.render("interview-form", { students, results });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Route to handle interview creation form submission
module.exports.addInterview =  async (req, res) => {
  try {
    const { companyName, date } = req.body;
    const newInterview = new Interview({ companyName, date });
    await newInterview.save();
    res.redirect("/create-interview"); // Redirect to interview creation page after successful submission
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

