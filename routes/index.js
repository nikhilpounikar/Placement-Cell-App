// getting dependencies
const express = require('express');
const homeController = require('../controllers/home_controller');

// getting router instance
const router = express.Router();

console.log("Router loaded");

router.get('/',homeController.home);
router.get('/employee',require('./employee_route'));

module.exports = router;