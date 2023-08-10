// getting dependencies
const express = require('express');

// getting homeController
const homeController = require('../controller/home_controller');
const passport = require("passport");

// getting router instance
const router = express.Router();

console.log("Router loader");
router.get('/',homeController.home);
router.use('/employee',require('./employee_route'));
//router.use('/user',require('./userRoute'));

module.exports = router;