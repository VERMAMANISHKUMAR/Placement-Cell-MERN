const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    batch: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type:Number, required: true },
    college: { type: String, required: true },
    status: {
        type: String, default: 'not_placed', // Default value if not provided
    },
    //enum: ["Software Developer", "Frontend Developer", "Backend Developer","Web Developer","Data Analyst","System Administrator","Cybersecurity Analyst","QA Tester","Cloud Engineer","DevOps Engineer","Mobile App Developer","UI/UX Designer","Database Admin","AI Engineer","IT Consultant","AI Prompt Engineer"],  // Ensure these are the valid values
    DSA_FinalScore: { type: Number, default: 0 },
    WebD_FinalScore: { type: Number, default: 0 },
    React_FinalScore: { type: Number, default: 0 },
}, 
{ timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
