const express = require("express");
const passport = require("passport");

const interviewController = require("../controller/interview_controller");

const router = express.Router();

router.get("/create",passport.checkAuthentication,interviewController.getInterviewForm);
router.post("/create",passport.checkAuthentication, interviewController.addInterview);
router.get("/view",passport.checkAuthentication,interviewController.getInterviewList);

module.exports = router;