// Import the Batch model
const Batch = require("../models/Batch");

// Controller function to render the batch creation form
module.exports.createBatch = function(req, res) {
  return res.render('batch_form', { title: "Placement Cell | Batch" });
}

// Controller function to fetch and display all available batches
module.exports.allBatches = async (req, res) => {
  try {
    // Fetch all available batches from the database using the Batch model
    const availableBatches = await Batch.find();
    
    // Render the "student-form" view with the available batches data
    res.render("student-form", { availableBatches });
  } catch (error) {
    // Handle any errors that occur during database interaction
    console.error(error);
    // Send an HTTP 500 response indicating internal server error
    res.status(500).send("Internal Server Error");
  }
}

// Controller function to add a new batch to the database
module.exports.addBatch = async function(req, res) {
  try {
    // Check if a batch with the provided name already exists in the database
    const batch = await Batch.findOne({ name: req.body.name });
    
    if (batch) {
      // If batch already exists, show an error message using flash and redirect back
      req.flash('error', 'Batch Already Exists');
      return res.redirect("back");
    }

    // Create a new batch in the database using data from the request body
    await Batch.create(req.body);
    
    // Show a success message using flash and redirect to the home page
    req.flash('success', 'Batch Added Successfully');
    return res.redirect("/");
  } catch (error) {
    // Handle any errors that occur during database interaction
    console.error(error);
    // Show an error message using flash and redirect back
    req.flash('error', 'Internal Server Error');
    return res.redirect("back");
  }
}
