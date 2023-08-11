const Batch = require("../models/Batch");


module.exports.createBatch = function(req,res){

  return res.render('batch_form',{title:"Placement Cell | Batch"});
}


module.exports.allBatches = async (req, res) => {
    try {
      const availableBatches = await Batch.find(); // Fetch available batches from your database
      
      res.render("student-form", { availableBatches });
    } catch (error) {
      // Handle error
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
}

module.exports.addBatch = async function(req,res){

  try {
    const batch = await Batch.findOne({name:req.body.name}); // Fetch available batches from your database
    
    if(batch){
      req.flash('error','Batch Already Exits');
      return res.redirect("back");
    }

    await Batch.create(req.body);
    req.flash('success','Batch Added Successfully');
    return res.redirect("/");
  } catch (error) {
    // Handle error
    console.error(error);
    //res.status(500).send("Internal Server Error");
    req.flash('error','Internal Server Error');
    return res.redirect("back");
  }

}