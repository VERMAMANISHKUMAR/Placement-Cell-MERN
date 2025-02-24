import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; // Added icons
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added state for mobile menu

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
          const userData = response.data;
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

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Placement Call</Link>
      </div>

      {/* Hamburger menu button */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation links with mobile menu class */}
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/studentslist" onClick={() => setIsMenuOpen(false)}>All Students</Link></li>
        <li><Link to="/interviews" onClick={() => setIsMenuOpen(false)}>Interviews</Link></li>
        <li><Link to="/alljobs" onClick={() => setIsMenuOpen(false)}>All Jobs</Link></li>
      </ul>

      {/* Auth section with mobile menu class */}
      <div className={`navbar-auth ${isMenuOpen ? 'active' : ''}`}>
        {isAuthenticated ? (
          <div className="user-info">
            <FaUserCircle className="user-icon"/>
            {user ? <span className="username">Hi {user.name}</span> : <span>Loading...</span>}
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
            <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
            // <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
