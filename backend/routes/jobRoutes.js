const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Display Job Listings Page
router.get('/jobs', jobController.jobPage);  // Render job listings page with job data

module.exports = router;
