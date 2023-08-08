const express = require("express");
const passport = require("passport");

const interviewController = require("../controller/interview_controller");

const router = express.Router();

router.get("/create-interview",passport.setAuthenticated,interviewController.getInterviewForm);
router.post("/create-interview",passport.setAuthenticated, interviewController.addInterview);


module.exports = router;