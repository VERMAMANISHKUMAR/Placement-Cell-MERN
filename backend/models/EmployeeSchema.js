const mongoose = require('mongoose');

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters long'],
    },
    LastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters long'],
    },
    Email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please enter a valid email address',
        ],
    },
    Password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false, // Prevents password from being returned in queries by default
    },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

// Export the model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
