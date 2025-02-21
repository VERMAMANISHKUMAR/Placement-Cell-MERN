// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv'; // For exporting data to CSV
import * as XLSX from 'xlsx'; // For exporting data to Excel
import { Link } from 'react-router-dom'; // For navigation
import { toast, ToastContainer } from 'react-toastify'; // Toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import './StudentList.css'; // CSS styles

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('https://placement-cell-mern-backend.onrender.com/api/students');
                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = errorData?.error || response.statusText;
                    throw new Error(errorMessage);
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format from API.');
                }
                setStudents(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                toast.error(`Error fetching data: ${error.message}`);
            }
        };
        fetchStudents();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (studentId) => {
        try {
            const response = await fetch(`https://placement-cell-mern-backend.onrender.com/api/students/${studentId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete student');
            }
            setStudents((prevStudents) => prevStudents.filter(student => student._id !== studentId));
            toast.success('Student deleted successfully.');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentStudents = students.slice(startIndex, startIndex + itemsPerPage);

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(students);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
        XLSX.writeFile(workbook, 'students_data.xlsx');
    };

    if (loading) {
        return <div style={{textAlign:"center"}}>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="student-list-container">
            <ToastContainer /> {/* Toast container for notifications */}
            <h1>Student List</h1>
            {students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <>
                    <div className="export-buttons">
                        <button className="export-button csv-button">
                            <CSVLink data={students} filename="students_data.csv">Download CSV</CSVLink>
                        </button>
                        <button className="export-button excel-button" onClick={downloadExcel}>
                            Download Excel
                        </button>
                        <button className="export-button-a excel-button-manish">
                            <Link to="/students/add">Add Student</Link>
                        </button>
                    </div>
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Batch</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>College</th>
                                <th>Job Role</th>
                                <th>DSA Score</th>
                                <th>Web Score</th>
                                <th>React Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStudents.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.batch}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.college}</td>
                                    <td>{student.status}</td>
                                    <td>{student.DSA_FinalScore}</td>
                                    <td>{student.WebD_FinalScore}</td>
                                    <td>{student.React_FinalScore}</td>
                                    <td>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(student._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(students.length / itemsPerPage) }, (_, i) => (
                            <button
                                key={i}
                                className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default StudentList;
