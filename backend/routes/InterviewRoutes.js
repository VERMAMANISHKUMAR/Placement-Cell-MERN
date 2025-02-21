const express = require('express');
const { addInterviewAPI, getAllInterviews, deleteInterview,} = require('../controllers/InterviewController');

const router = express.Router();

// Route to create a new interview
router.post('/', addInterviewAPI);

// Route to get all interviews
router.get('/', getAllInterviews);

// Route to delete an interview by ID
router.delete('/:id', deleteInterview);

module.exports = router;


