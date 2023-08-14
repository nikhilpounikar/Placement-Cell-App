const express = require("express");
const passport = require("passport");

const employeeController = require("../controller/employee_controller");

const router = express.Router();

router.post('/sign-up',employeeController.register);
// router.get('/sign-up',employeeController.register);

router.get('/sign-up',employeeController.signUp);

router.get("/sign-in", employeeController.signIn);
  
router.post("/sign-in", passport.authenticate("local", { failureRedirect: "/employee/sign-in" }), employeeController.login);

router.get("/sign-out", employeeController.destroySession);

module.exports = router;