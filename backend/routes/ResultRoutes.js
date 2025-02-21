const express = require('express');
const router = express.Router();
const resultController = require('../controllers/ResultController');

// Display Result Page
router.get('/result/:id', resultController.resultPage);  // Render result page for a specific interview

// Update Result
router.post('/result/update', resultController.update);  // Handle result update for students

module.exports = router;
