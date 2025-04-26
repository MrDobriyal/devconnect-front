// components/PrivateRoute.jsx
import React,{ useContext ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } =useAuth();
    const navigate =useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/login');
        }
      }, [isAuthenticated]);
      
  if (!isAuthenticated) {
     return "You Dont have Access"
  }

  return children;
};

export default PrivateRoute;
