const express = require("express");
const passport = require("passport");

const studentController = require("../controller/student_controller");

const router = express.Router();

router.post('/register',passport.checkAuthentication,studentController.register);
// router.get('/sign-up',employeeController.register);

router.get('/register',passport.checkAuthentication,studentController.getRegisterForm);


router.get('/interview/:id',passport.checkAuthentication,studentController.getInterviews);
router.post('/schedule-interview/:id',passport.checkAuthentication,studentController.scheduleInterview);
router.post('/render-csv-data/',passport.checkAuthentication,studentController.renderStudentDataInCSV);
// router.get("/sign-in", employeeController.signIn);
  
// router.post("/sign-in", employeeController.login);

module.exports = router;