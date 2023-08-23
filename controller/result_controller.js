// Import required models
const Interview = require("../models/Interview");
const Result = require('../models/Result');
const Student = require('../models/Student');

// Controller function to update interview results
module.exports.updateResult = async function(req,res){

  try {
    const id = req.params.id;

    // Check if the result reference ID is missing
    if(!id){
      req.flash("error", "Result Reference Missing");
      return res.redirect('back');
    }

    // Find the result in the database based on the provided ID
    let result = await Result.findById(id);

    // If the result doesn't exist, show an error message and redirect back
    if(!result){
        req.flash("error", "Result does not exist");
        return res.redirect('back');
    }

    // Update the status of the result based on the newStatus value from the request body
    result.status = req.body.newStatus;
    await result.save();

    // If the new status is 'Pass', update the student's status to 'Placed'
    if(req.body.newStatus == 'Pass'){
        let student = await Student.findById(result.student);
        if(student){
            student.status = 'Placed';
            await student.save();
        }
    }

    // Display success message using flash and send a JSON response
    req.flash("success", "Interview Result Updated");
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }
}
