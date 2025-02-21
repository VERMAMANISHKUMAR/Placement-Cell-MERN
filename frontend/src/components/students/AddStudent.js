import React, { useState } from 'react';

import './AddStudent.css';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    batch: '',
    name: '',
    email: '',
    phone: '',
    college: '',
    status: 'not_placed',
    DSA_FinalScore: 0,
    WebD_FinalScore: 0,
    React_FinalScore: 0,
  });

  // Handle change in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('https://placement-cell-mern-backend.onrender.com/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Student added successfully:', result);

      // Reset the form after successful submission
      setFormData({
        batch: '',
        name: '',
        email: '',
        phone: '',
        college: '',
        status: 'not_placed',
        DSA_FinalScore: 0,
        WebD_FinalScore: 0,
        React_FinalScore: 0,
      });

      alert("Are you sure to add the data?");
    } catch (error) {
      console.error('Error adding student:', error);
      alert('This student already exists. Please use a different email..');
    }
  };

  return (
    <div className="add-student-container">
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit} className="add-student-form">
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="batch">Batch:</label>
          <input
            type="text"
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            placeholder="Enter batch (e.g., 2025)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="college">College:</label>
          <input
            type="text"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="Enter college name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Job Role:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="not_placed">Select the Job Role</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="System Administrator">System Administrator</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            <option value="Quality Assurance Tester">QA Tester</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Mobile App Developer">Mobile App Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Database Administrator">Database Admin</option>
            <option value="AI Engineer">AI Engineer</option>
            <option value="IT Consultant">IT Consultant</option>
            <option value="AI Prompt Engineer">AI Prompt Engineer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="DSA_FinalScore">DSA Final Score:</label>
          <input
            type="number"
            id="DSA_FinalScore"
            name="DSA_FinalScore"
            value={formData.DSA_FinalScore}
            onChange={handleChange}
            min="0"
            placeholder="Enter DSA score"
          />
        </div>

        <div className="form-group">
          <label htmlFor="WebD_FinalScore">Web Development Final Score:</label>
          <input
            type="number"
            id="WebD_FinalScore"
            name="WebD_FinalScore"
            value={formData.WebD_FinalScore}
            onChange={handleChange}
            min="0"
            placeholder="Enter WebD score"
          />
        </div>

        <div className="form-group">
          <label htmlFor="React_FinalScore">React Final Score:</label>
          <input
            type="number"
            id="React_FinalScore"
            name="React_FinalScore"
            value={formData.React_FinalScore}
            onChange={handleChange}
            min="0"
            placeholder="Enter React score"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
