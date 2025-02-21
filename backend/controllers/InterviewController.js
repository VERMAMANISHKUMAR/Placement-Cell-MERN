const mongoose = require('mongoose');
const Interview = require('../models/InterviewSchema'); // Ensure the correct path

// Create or allocate an interview (POST)
const addInterviewAPI = async (req, res) => {
  try {
    const { name, batch, interviewerName, interviewDate, interviewTime, link } = req.body;

    // Create the interview document
    const newInterview = new Interview({
      batch,
      name,
      interviewerName,
      interviewDate,
      interviewTime,
      link,
    });

    // Save the new interview to the database
    await newInterview.save();

    // Return success response
    return res.status(201).json({
      message: 'Interview created successfully',
      newInterview,
    });
  } catch (error) {
    console.error('Error creating interview:', error);
    return res.status(500).json({ message: 'Error creating interview' });
  }
};

// Get all interviews (GET)
const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find(); // Retrieve all interviews
    return res.status(200).json(interviews);
  } catch (error) {
    console.error('Error retrieving interviews:', error);
    return res.status(500).json({ message: 'Error retrieving interviews' });
  }
};

// Delete an interview by ID (DELETE)
const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('Attempting to delete interview with ID:', id);

    // Validate if the ID is in proper format
    if (!mongoose.isValidObjectId(id)) {
      console.log('Invalid ID format:', id);
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Check if the interview exists
    const interview = await Interview.findById(id);
    if (!interview) {
      console.log('No interview found with ID:', id);
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Delete the interview
    await Interview.findByIdAndDelete(id);

    console.log('Interview deleted successfully with ID:', id);
    return res.status(200).json({ message: 'Interview deleted successfully' });
  } catch (error) {
    console.error('Error deleting interview:', error);
    return res.status(500).json({ message: 'Error deleting interview' });
  }
};

// Export the controller functions
module.exports = { addInterviewAPI, getAllInterviews, deleteInterview };
