// getting dependencies
const express = require('express');

// getting router instance
const router = express.Router();
const employeeController = require('../controllers/employee_controller');


router.get('/employe:id',homeController.home);
router.post('/employe',homeController.home);
router.put('/employe:id',homeController.home);
router.delete('/employe:id',homeController.home);

module.exports = router;