const Batch = require("../models/Batch");

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