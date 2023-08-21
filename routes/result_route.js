const express = require("express");
const passport = require("passport");

const resultController = require("../controller/result_controller");

const router = express.Router();

router.post('/updateStatus/:id',passport.checkAuthentication,resultController.updateResult);


module.exports = router;