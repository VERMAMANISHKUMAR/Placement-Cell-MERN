import React, { useState, useEffect } from 'react';
import './StudentOpportunities.css';
import { Button, Pagination, Table } from 'react-bootstrap';

const ITEMS_PER_PAGE = 5;

const StudentOpportunities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:3808/api/interviews')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleJoinClick = (link) => {
    window.open(link, '_blank');
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const paginatedStudents = students.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="student-opportunities">
      <h1>Student Opportunities</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Batch</th>
            <th>Student Name</th>
            <th>Interviewer Name</th>
            <th>Interview Link</th>
            <th>Interview Date</th>
            <th>Interview Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.batch}</td>
              <td>{student.name}</td>
              <td>{student.interviewerName}</td>
              <td>
                <a href={student.link} target="_blank" rel="noopener noreferrer">
                  {student.link}
                </a>
              </td>
              <td>{formatDate(student.createdAt)}</td>
              <td>{formatTime(student.createdAt)}</td>
              <td>
                <Button variant="primary" onClick={() => handleJoinClick(student.link)}>
                  Join
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination">
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <div className="total-counter">
        Total Opportunities: {students.length}
      </div>
    </div>
  );
};

export default StudentOpportunities;
