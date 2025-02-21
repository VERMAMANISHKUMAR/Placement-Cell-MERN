const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectMongoDB = require('./config/db');
const StudentController = require('./controllers/StudentController');
const interviewRoutes = require('./routes/InterviewRoutes'); // Updated import
const authRoutes = require('./routes/authRoutes'); 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3808;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Student Routes
app.post('/api/students', StudentController.addStudentAPI);
app.get('/api/students', StudentController.getStudentsAPI);
app.delete('/api/students/:id', StudentController.deleteStudentAPI);

// Interview Routes
app.use('/api/interviews', interviewRoutes);
app.use("/api/auth", authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Authentication Backend Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectMongoDB();
});
