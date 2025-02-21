const validator = require('validator');
const Student = require('../models/StudentSchema'); // Ensure this path is correct

// Function to add a new student
const addStudentAPI = async (req, res) => {
    try {
        const { batch, name, phone, email, college, status, DSA_FinalScore, WebD_FinalScore, React_FinalScore } = req.body;

        if (!validator.isAlpha(name, 'en-US', { ignore: ' ' })) {
            return res.status(400).json({ error: 'Invalid name format!' });
        }

        if (!email || !batch || !phone || !college) {
            return res.status(400).json({ error: 'Name, Batch, Phone, and College are required fields!' });
        }

        if (!/^[0-9]+$/.test(phone)) {
            return res.status(400).json({ error: 'Phone number must be numeric!' });
        }

        if (isNaN(DSA_FinalScore) || isNaN(WebD_FinalScore) || isNaN(React_FinalScore)) {
            return res.status(400).json({ error: 'Scores must be numeric values!' });
        }

        const existingStudent = await Student.findOne({ email, phone });
        if (existingStudent) {
            return res.status(409).json({ error: 'A student with this email already exists!' });
        }

        const newStudent = new Student({
            batch,
            name,
            email,
            phone,
            college,
            status: status || 'not_placed',
            DSA_FinalScore: Number(DSA_FinalScore) || 0,
            WebD_FinalScore: Number(WebD_FinalScore) || 0,
            React_FinalScore: Number(React_FinalScore) || 0,
        });

        await newStudent.save();

        return res.status(201).json({
            message: 'Student added successfully!',
            student: newStudent,
        });
    } catch (error) {
        console.error('Error adding student:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to fetch all students
const getStudentsAPI = async (req, res) => {
    try {
        const students = await Student.find();

        if (!students || students.length === 0) {
            return res.status(404).json({ error: 'No students found' });
        }

        return res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to delete a student
const deleteStudentAPI = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addStudentAPI, getStudentsAPI, deleteStudentAPI };
