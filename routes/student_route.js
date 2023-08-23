// Import required modules
const express = require("express");
const passport = require("passport");

// Import the student controller module
const studentController = require("../controller/student_controller");

// Create a new instance of the Express Router
const router = express.Router();

// Define routes for student-related functionalities

// POST route for student registration
// Uses the passport.checkAuthentication middleware to ensure authentication
// Calls the studentController.register function to handle student registration
router.post('/register', passport.checkAuthentication, studentController.register);

// GET route for accessing the student registration form
// Uses the passport.checkAuthentication middleware to ensure authentication
// Calls the studentController.getRegisterForm function to render the form
router.get('/register', passport.checkAuthentication, studentController.getRegisterForm);

// GET route for accessing student interviews
// Uses the passport.checkAuthentication middleware to ensure authentication
// Calls the studentController.getInterviews function to retrieve and render student interviews
router.get('/interview/:id', passport.checkAuthentication, studentController.getInterviews);

// POST route for scheduling a student interview
// Uses the passport.checkAuthentication middleware to ensure authentication
// Calls the studentController.scheduleInterview function to handle scheduling an interview
router.post('/schedule-interview/:id', passport.checkAuthentication, studentController.scheduleInterview);

// GET route for rendering student data as CSV
// Uses the passport.checkAuthentication middleware to ensure authentication
// Calls the studentController.renderStudentDataInCSV function to generate and render CSV data
router.get('/render-csv-data', passport.checkAuthentication, studentController.renderStudentDataInCSV);

// Export the router to make it available in other parts of the application
module.exports = router;
