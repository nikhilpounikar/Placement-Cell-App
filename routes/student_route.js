const express = require("express");
const passport = require("passport");

const studentController = require("../controller/student_controller");

const router = express.Router();

// router.post('/register',employeeController.register);
// router.get('/sign-up',employeeController.register);

router.get('/register',studentController.getRegisterForm);

// router.get("/sign-in", employeeController.signIn);
  
// router.post("/sign-in", employeeController.login);

module.exports = router;