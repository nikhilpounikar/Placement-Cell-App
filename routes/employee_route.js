// getting dependencies
const express = require('express');

// getting router instance
const router = express.Router();
const employeeController = require('../controllers/employee_controller');

router.get("/sign-up", employeeController.signUp);

router.get("/sign-in", employeeController.signIn);

router.post("/register",employeeController.register);

// using Passport authentication
router.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
    employeeController.login
);

module.exports = router;