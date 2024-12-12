import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to provide context to the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Parse the user from localStorage, or return null if not available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  
  const login = (userData, authToken) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
    setUser(userData); // Update context state
    setUser(authToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user from localStorage
    setUser(null); // Update context state
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
