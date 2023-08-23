// Import required modules
const express = require("express");
const passport = require("passport");

// Import the employee controller module
const employeeController = require("../controller/employee_controller");

// Create a new instance of the Express Router
const router = express.Router();

// Define routes for employee sign-up and sign-in

// POST route for employee sign-up
router.post('/sign-up', employeeController.register);

// GET route for accessing the employee sign-up form
router.get('/sign-up', employeeController.signUp);

// GET route for accessing the employee sign-in form
router.get("/sign-in", employeeController.signIn);

// POST route for processing employee sign-in form data
router.post("/sign-in", passport.authenticate("local", { failureRedirect: "/employee/sign-in" }), employeeController.login);

// GET route for employee sign-out
router.get("/sign-out", employeeController.destroySession);

// Export the router to make it available in other parts of the application
module.exports = router;
