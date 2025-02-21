import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Notifications
import 'react-toastify/dist/ReactToastify.css'; // Notification styles
import './InterviewForm.css'; // Custom CSS (optional)

const InterviewForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    batch: '',
    studentName: '',
    interviewName: '',
    link: '',
    time: '',
    date: '',
  });

  // Handle input changes and update formData
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send POST request with formData
      const response = await fetch('http://localhost:3808/api/interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Interview scheduled successfully!');
        // Clear form data after successful submission
        setFormData({
          batch: '',
          interviewerName: '',
          interviewName: '',
          link: '',
          time: '',
          date: '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to schedule interview.');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while scheduling the interview.');
    }
  };

  return (
    <div className="form-container-main container">
      <h2 className="text-center mb-4">Schedule Interview</h2>
      <div className="form-container p-4 shadow rounded bg-light">
        <form onSubmit={handleFormSubmit}>
          {/* Input fields */}
          <div className="mb-3">
            <label htmlFor="batch" className="form-label">Batch</label>
            <input
              type="text"
              className="form-control"
              id="batch"
              name="batch"
              placeholder="Enter Batch Name"
              value={formData.batch}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">Student Name</label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              name="studentName"
              placeholder="Enter Student Name"
              value={formData.studentName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="interviewName" className="form-label">Interview Name</label>
            <input
              type="text"
              className="form-control"
              id="interviewName"
              name="interviewName"
              placeholder="Enter Interview Name"
              value={formData.interviewName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="link" className="form-label">Meeting Link</label>
            <input
              type="url"
              className="form-control"
              id="link"
              name="link"
              placeholder="Enter Meeting Link"
              value={formData.link}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="time" className="form-label">Meeting Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">Meeting Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-100">Schedule Interview</button>
        </form>
      </div>
      {/* Toast notification container */}
      <ToastContainer /> 
    </div>
  );
};

export default InterviewForm;
