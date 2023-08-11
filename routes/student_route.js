const express = require("express");
const passport = require("passport");

const studentController = require("../controller/student_controller");

const router = express.Router();

router.post('/register',studentController.register);
// router.get('/sign-up',employeeController.register);

router.get('/register',studentController.getRegisterForm);


router.get('/interview/:id',studentController.getInterviews);
router.post('/schedule-interview/:id',studentController.scheduleInterview);
// router.get("/sign-in", employeeController.signIn);
  
// router.post("/sign-in", employeeController.login);

module.exports = router;