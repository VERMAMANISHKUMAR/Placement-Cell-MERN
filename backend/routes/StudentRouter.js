const express = require('express');
const router = express.Router();

// Import your controller function
const { addStudentAPI } = require('../controllers/StudentController');

// Define the route and make sure you're passing the correct function as the second argument
router.post('/add', addStudentAPI);

module.exports = router;
