import React, { createContext, useContext, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example state: logged-in user
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Example login function
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Example logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};
