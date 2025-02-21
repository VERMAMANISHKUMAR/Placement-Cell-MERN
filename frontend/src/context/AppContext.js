import React, { createContext, useContext, useState } from 'react';

// Create AppContext
const AppContext = createContext();

// AppContext Provider
export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light'); // Example state: theme

  return (
    <AppContext.Provider value={{ loading, setLoading, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};
