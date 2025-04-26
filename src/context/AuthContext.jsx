import React, { createContext, useState, useEffect ,useContext } from 'react';
import { login, register, getUser, logout } from '../api/auth'; // import the auth API functions
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
const AuthContext = createContext();
export const useAuth  = () => useContext(AuthContext);
// AuthContext provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // to hold the user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // to track if the user is logged in
  const [loading, setLoading] = useState(true); // to handle loading state when checking auth
  
  // Check if the user is logged in on app startup
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(); // Get the user data using the API
        setUser(userData); // Set the user data in the state
        setIsAuthenticated(true); // User is authenticated
      } catch (err) {
        setIsAuthenticated(false); // User is not authenticated
      }
      setLoading(false); // Stop loading after check
    };

    fetchUser();
  }, []);

  // Login handler
  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password); // Call login API function
      const userData = await getUser();
      setUser(userData);
      setIsAuthenticated(true); // Mark user as authenticated
      return data;
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  // Register handler
  const registerUser = async (username, email, password) => {
    try {
      const data = await register(username, email, password); // Call register API function
      if(data) return data;
      
    } catch (err) {
      console.error('Registration failed:', err);
      throw err.msg;
    }
  };

  // Logout handler
  const logoutUser = () => {
    logout(); // Call the logout function
    setUser(null); // Clear the user data
    setIsAuthenticated(false); // Mark user as logged out
  };

  // Provide the context value to all child components
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      loginUser,
      registerUser,
      logoutUser,
    }}>
      {children} {/* Only render children once loading is complete */}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
