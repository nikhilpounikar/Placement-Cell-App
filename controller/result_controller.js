const Interview = require("../models/Interview");
const Result = require('../models/Result');

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
    console.log(req.body);
    result.status = req.body.newStatus;
    console.log(result);
    await result.save();
    req.flash("success", "interview Result Updated");
    return res.redirect('back');
  } catch (error) {
    console.error(error);
    req.flash("error", "Internal Server Error");
    return res.redirect("back");
  }

}