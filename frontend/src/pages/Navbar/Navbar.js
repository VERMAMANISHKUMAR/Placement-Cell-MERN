import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import axios from "axios"; // Import axios for API call
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  // Fetch user data if authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("https://placement-cell-mern-backend.onrender.com/api/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data; // Assuming API returns user details
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const publicRoutes = ["/register", "/login", "/"];
    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
      navigate("/register");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Placement Call</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/studentslist">All Students</Link></li>
        <li><Link to="/interviews">Interviews</Link></li>
        <li><Link to="/alljobs">All Jobs</Link></li>
        {/* <li><Link to="/students/add">Add Jobs</Link></li> */}
        {/* <li><Link to="/studentportal">Student Portal</Link></li> */}
        {/* <li><Link to="/addInterview">Interview Schedule</Link></li> */}
      </ul>

      {/* Right side Auth section */}
      <div className="navbar-auth">
        {isAuthenticated ? (
          <div className="user-info">
            <FaUserCircle className="user-icon"/>
            {user ? <span className="username">Hii {user.name}</span> : <span>Loading...</span>}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/register");
              }}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
