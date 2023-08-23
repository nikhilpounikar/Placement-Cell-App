// Import required modules
const express = require("express");
const passport = require("passport");

// Import the interview controller module
const interviewController = require("../controller/interview_controller");

// Create a new instance of the Express Router
const router = express.Router();

// Define routes for interview-related functionalities

// GET route for accessing the interview creation form
// Uses the passport.checkAuthentication middleware to ensure authentication
router.get("/create", passport.checkAuthentication, interviewController.getInterviewForm);

// POST route for processing interview creation form data
// Uses the passport.checkAuthentication middleware to ensure authentication
router.post("/create", passport.checkAuthentication, interviewController.addInterview);

// GET route for viewing a list of interviews
// Uses the passport.checkAuthentication middleware to ensure authentication
router.get("/view", passport.checkAuthentication, interviewController.getInterviewList);

// GET route for retrieving a list of students for a specific interview
// Uses the passport.checkAuthentication middleware to ensure authentication
router.get("/get-students/:id", passport.checkAuthentication, interviewController.getStudentList);

// Export the router to make it available in other parts of the application
module.exports = router;
