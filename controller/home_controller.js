const Batch = require("../models/Batch");
const Student = require("../models/Student");
const Inteview = require("../models/Interview");

module.exports.home = async function (req, res) {
  try {
    let students = await Student.find({})
      //.sort('-createdAt')
      .populate("batch")
      .populate("interviews")
      // .populate({
      //   // fetching all comments related to the post
      //   path: "Batch",
      //   populate: {
      //     // fetching all the user who have made comment on the purticular post
      //     path: "user",
      //   },
      //   populate: {
      //       path: 'likes'
      //   }
        
      // })
      // .populate('Batch')
      .populate('result');

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

