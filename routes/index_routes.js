// Import required modules
const express = require('express');

// Import the home controller module
const homeController = require('../controller/home_controller');
const passport = require("passport");

// Create a new instance of the Express Router
const router = express.Router();

// Define the main routes

// GET route for the home page
// Uses the passport.checkAuthentication middleware to ensure authentication before accessing the home page
router.get('/', passport.checkAuthentication, homeController.home);

// Use other route modules
// Each module defines its own routes and functionality

// Load the employee route module
router.use('/employee', require('./employee_route'));

// Load the student route module
router.use('/student', require('./student_route'));

// Load the batch route module
router.use('/batch', require('./batch_route'));

// Load the interview route module
router.use('/interview', require('./interview_route'));

// Load the result route module
router.use('/result', require('./result_route'));

// Export the router to make it available in other parts of the application
module.exports = router;
