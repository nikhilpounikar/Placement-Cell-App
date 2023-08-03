// getting dependencies
const express = require('express');
 homeController = require('../controllers/home_controller');

// getting router instance
const router = express.Router();

console.log("Router loaded");

// navigate to login page/sign up page
router.get('/employee',require('./employee_route'));

module.exports = router;