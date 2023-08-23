// Import required modules
const express = require("express");
const passport = require("passport");

// Import the result controller module
const resultController = require("../controller/result_controller");

// Create a new instance of the Express Router
const router = express.Router();

// Define route for updating result status

// POST route for updating result status
// Uses the passport.checkAuthentication middleware to ensure authentication
// Calls the resultController.updateResult function to update the result status
router.post('/updateStatus/:id', passport.checkAuthentication, resultController.updateResult);

// Export the router to make it available in other parts of the application
module.exports = router;
