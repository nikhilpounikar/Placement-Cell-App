const Interview = require("../models/Interview");
const Result = require('../models/Result');
const Student = require('../models/Student');

module.exports.updateResult = async function(req,res){

  try {

    const id = req.params.id;

    if(!id){
      req.flash("error", "Result Reference Missing");
      return res.redirect('back');
    }

    let result = await Result.findById(id);

    if(!result){
        req.flash("error", "Result does not exits");
        return res.redirect('back');
    }


    result.status = req.body.newStatus;
    await result.save();

    if(req.body.newStatus == 'Pass'){
        
        let student = await Student.findById(result.student);

        if(student){
            student.status = 'Placed';

            await student.save();
        }

    }

    req.flash("success", "interview Result Updated");
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }

}