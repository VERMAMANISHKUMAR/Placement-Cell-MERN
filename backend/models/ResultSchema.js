const mongoose = require('mongoose');

// Define the Result schema
const resultSchema = new mongoose.Schema({
    result: {
        type: String,
        enum: ['PASS', 'FAIL', 'On Hold', 'Did not Attempt'], // Fixed typo in 'Did not Attempt'
        default: 'On Hold',
        required: [true, 'Result status is required'],
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Reference to the Student model
        required: [true, 'Student ID is required'],
    },
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview', // Reference to the Interview model
        required: [true, 'Interview ID is required'],
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create and export the Result model
const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
