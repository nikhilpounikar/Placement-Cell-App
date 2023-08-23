// Import required modules
const express = require("express");
const passport = require("passport");

// Import the batch controller module
const batchController = require("../controller/batch_controller");

// Create a new instance of the Express Router
const router = express.Router();

// Define routes for creating and adding batches

// GET route for accessing the batch creation form
router.get("/create-batch", passport.checkAuthentication, batchController.createBatch);

// POST route for processing batch creation form data
router.post("/create-batch", passport.checkAuthentication, batchController.addBatch);

// Export the router to make it available in other parts of the application
module.exports = router;
