// getting dependencies
const express = require('express');

// getting router instance
const router = express.Router();
const employeeController = require('../controllers/employee_controller');


router.get('/login',employeeController.login);
router.post('/register',employeeController.register);


module.exports = router;