import React, { useState, useEffect } from 'react';
import './InterviewList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 6;

const InterviewList = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    interviewName: '',
    link: '',
    date: new Date().toISOString().slice(0, 10),
  });
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3808/api/students")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentIndex !== null) {
      const updatedData = [...students];
      updatedData[currentIndex].interviewSchedule = formData.link;
      setStudents(updatedData);
      setShowForm(false);
      setFormData({
        studentName: '',
        interviewName: '',
        link: '',
        date: new Date().toISOString().slice(0, 10),
      });
      setCurrentIndex(null);
      toast.success("Interview Scheduled Successfully!");
    }
  };

  const handleScheduleClick = (index) => {
    setShowForm(true);
    setCurrentIndex(index);
  };

  // Send interview details for each student
  const handleSendClick = async (index) => {
    const item = students[index];

    const interviewData = {
      batch: item.batch,
      name: item.name,
      email: item.email,
      phone: item.phone,
      college: item.college,
      jobrole: item.status, // Assuming the 'status' field represents the job role
      interviewSchedule: item.interviewSchedule
    };

    try {
      const response = await fetch("https://placement-cell-mern-backend.onrender.com/api/interviews", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interviewData),
      });

      if (response.ok) {
        toast.info(`Interview details sent for ${item.name}!`);
      } else {
        throw new Error('Failed to send interview details');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedStudents = students.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="interview-list-container">
      <div className="interview-list">
        <h1>Interview List</h1>
        <table className="interview-table">
          <thead>
            <tr>
              <th>Batch</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>College/Training</th>
              <th>Job Role</th>
              <th>Interview Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.batch}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.college}</td>
                <td>{student.status}</td>
                <td>
                  {student.interviewSchedule ? (
                    <a href={student.interviewSchedule} target="_blank" rel="noopener noreferrer">
                      {student.interviewSchedule}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleScheduleClick(index)}
                      className="schedule-button"
                    >
                      Schedule Interview
                    </button>
                  )}
                </td>
                <td>
                  {student.interviewSchedule && (
                    <button
                      onClick={() => handleSendClick(index)}
                      className="send-button"
                    >
                      Send
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showForm && (
          <div className="form-container-main">
            <h2>Schedule Interview</h2>
            <div className='form-container'>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Student Name:
                  <input
                    type="text"
                    name="studentName"
                    placeholder='Enter Student Name'
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Interview Name:
                  <input
                    type="text"
                    name="interviewName"
                    placeholder='Enter Interviewer Name'
                    value={formData.interviewName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Meeting Link:
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <button type="submit" className="add-button" style={{marginLeft:'90px'}}>Schedule Interview</button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="sidebar">
        <div className='pagination-text'>
          <h4 style={{marginLeft:'20px'}}>Total Students: {students.length}</h4>
          <p style={{marginLeft:'20px'}}>Page {currentPage} of {totalPages}</p>
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default InterviewList;
