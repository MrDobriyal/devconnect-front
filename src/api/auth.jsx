import api from '../utils/axios';

// Function to register a new user
export const register = async (username, email, password) => {
  try {
    const response = await api.post('/auth/register', {
      "name":username,
      email,
      password,
    });
    return response.data; // Returns the JWT token on successful registration
  } catch (error) {
    console.error('Error registering:', error);
    throw error.response.data; // If error occurs, throw the error message
  }
};

// Function to login a user
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    localStorage.setItem('authToken', response.data.token); // Store token in localStorage
    return response.data; // Returns the JWT token on successful login
  } catch (error) {
    console.error('Error logging in:', error);
    throw error.response.data; // If error occurs, throw the error message
  }
};

// Function to get the logged-in user's details
export const getUser = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No token found');
    
    const response = await api.get('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`, // Attach the token in the header
      },
    });
    return response.data; // Returns the logged-in user's data
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error.response.data; // If error occurs, throw the error message
  }
};

// Function to logout the user
export const logout = () => {
  localStorage.removeItem('authToken'); // Remove token from localStorage
};

