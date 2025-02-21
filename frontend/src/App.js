import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar/Navbar';
import AddStudent from './components/students/AddStudent';
import StudentList from './components/students/StudentList';
import InterviewList from './components/interviews/InterviewList';
import AllJobs from './components/jobs/JobsList';
import StudentPotal from './components/Student Potal/DownloadCSV';
import AddInterview from './components/interviews/InterviewForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AutoSlider from './components/jobs/AutoSlider';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to Placement Call</h1>} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/studentslist" element={<StudentList />} />
        <Route path="/interviews" element={<InterviewList />} />
        <Route path="/alljobs" element={<AllJobs />} />
        <Route path="/addslider" element={<AutoSlider />} />
        <Route path="/studentpotal" element={<StudentPotal />} />
        <Route path="/addInterview" element={<AddInterview/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
