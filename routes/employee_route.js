const express = require("express");
const passport = require("passport");

const employeeController = require("../controller/employee_controller");

const router = express.Router();

router.post('registration',employeeController.register);

app.get("/login", employeeController.signIn);
  
app.post("/login", employeeController.login);

module.exports = router;