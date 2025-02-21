const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController');

// Sign In Routes
router.get('/sign-in', employeeController.SignInPage);  // Render SignIn Page
router.post('/sign-in', employeeController.SignIn);  // Handle SignIn

// Sign Up Routes
router.get('/sign-up', employeeController.createSessionPage);  // Render SignUp Page
router.post('/sign-up', employeeController.createSession);  // Handle SignUp

// Sign Out Route
router.get('/sign-out', employeeController.SignOut);  // Handle SignOut

module.exports = router;
