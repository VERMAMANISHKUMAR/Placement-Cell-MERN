import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import AutoSlider from './AutoSlider'; // Import the AutoSlider component

// JobSearch component
const JobSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleJobLocationChange = (event) => {
    setJobLocation(event.target.value);
  };

  const handleEmploymentTypeChange = (event) => {
    setEmploymentType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ searchQuery, jobLocation, employmentType });
  };

  return (
    <div className="container mt-5" style={{backdropFilter: 'red'}}>
      <div className="row">
        <div className="col-md-12" style={{border: '1px solid black', borderRadius: '10px', padding: '20px', backgroundColor: 'rgba(120, 178, 120, 0.8)'}}>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
            <div className="input-group" style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Title, Skills, or Company"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{border: '1px solid black', borderRadius: '10px', padding: '10px', width: '20%'}}
              />
              <select
                className="form-select"
                value={jobLocation}
                onChange={handleJobLocationChange}
                style={{border: '1px solid black', borderRadius: '10px', padding: '10px',}}
              >
                <option value="">Select Job Location</option>
                <option value="Remote">Remote</option>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
              </select>
              <select
                className="form-select"
                value={employmentType}
                onChange={handleEmploymentTypeChange}
                style={{border: '1px solid black', borderRadius: '10px', padding: '10px',}}
              >
                <option value="">Select Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
              <button type="submit" className="btn btn-primary" style={{border: '1px solid black', borderRadius: '10px', padding: '10px',}}>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// JobsList component
const JobsList = ({ jobs }) => {
  return (
    <div className="job-listings container py-4 mt-3">
      <h1 className="text-center mb-4">All Job Listings</h1>
      <div className="row">  
        {jobs.map((job) => (
          <div key={job.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow">
           
              <div className="card-body">
                <h5 className="card-title">{job.companyName}</h5>
                <p className="card-text">{job.description}</p>
                <p><strong>Experience:</strong> {job.experience}</p>
                <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Employment Type:</strong> {job.employmentType}</p>
                <p><small className="text-muted">Posted on: {job.postedDate}</small></p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-primary">
                  <Link to="/students/add" className="text-white text-decoration-none">
                    Apply Now
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component
const JobSearchAndList = () => {
  const [jobs, setJobs] = useState([]);

  const generateJobs = () => {
    const companies = [
      'Dummy IT Solutions', 'Fictional Tech Corp', 'Imaginary Software LLC',
      'Tech Innovators Inc.', 'NextGen Systems', 'Cloud Technologies Ltd.',
      'FutureWorks Tech', 'CyberSolutions Co.', 'CodeCrafters LLC', 'App Dev Studios'
    ];

    const skills = [
      ['React', 'Node.js', 'MongoDB'], ['Python', 'Django', 'AWS'], ['Java', 'Spring Boot', 'MySQL'],
      ['Vue.js', 'Laravel', 'PostgreSQL'], ['Angular', 'Express', 'SQLite'], ['C#', 'ASP.NET', 'Azure'],
      ['JavaScript', 'HTML', 'CSS'], ['PHP', 'WordPress', 'MySQL'], ['Go', 'Docker', 'Kubernetes'],
      ['Swift', 'Xcode', 'iOS']
    ];

    const locations = [
      'New York, NY', 'San Francisco, CA', 'Los Angeles, CA', 'Austin, TX',
      'Chicago, IL', 'Seattle, WA', 'Miami, FL', 'Boston, MA', 'Denver, CO', 'Dallas, TX'
    ];

    const employmentTypes = ['Full-time', 'Part-time'];

    const jobsList = [];
    for (let i = 0; i < 102; i++) {
      const job = {
        id: i + 1,
        logo: 'https://via.placeholder.com/200', 
        companyName: companies[i % companies.length],
        description: `We are looking for a skilled developer to join our team of professionals. 
        Responsibilities include coding, debugging, and improving software functionality.`,
        experience: `${Math.floor(Math.random() * 5) + 1} years of experience`,
        skills: skills[i % skills.length],
        location: locations[i % locations.length],
        employmentType: employmentTypes[i % employmentTypes.length],
        postedDate: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`
      };
      jobsList.push(job);
    }

    setJobs(jobsList);
  };
  const handleSearch = (searchParams) => {
    console.log('Search Parameters:', searchParams);
  };

  useEffect(() => {
    generateJobs();
  }, []);

  return (
    <div>
    <JobSearch onSearch={handleSearch} />
      <AutoSlider />
      <JobsList jobs={jobs} />
    </div>
  );
};

export default JobSearchAndList;
