const express = require("express");
const passport = require("passport");

const batchController = require("../controller/batch_controller");

const router = express.Router();

app.get("/create-student-form",passport.checkAuthentication, batchController.allBatches);

module.exports = router;