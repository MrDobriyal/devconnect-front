import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../context/AuthContext'; // Import the context
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const { loginUser } = useContext(AuthContext); // Get login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate =useNavigate();
  const location = useLocation();


  useEffect(()=>{
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  },[location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data =  await loginUser(email, password);
      if(data){
        console.log('Login successful:', data);
        // Redirect to the dashboard or home page after successful login
        navigate('/');
      }
    } catch (err) {
      setError(err.msg || 'Invalid credentials');
      setError(err.msg);
    }
  };

  return (
    
    <div className='flex justify-center items-center h-screen bg-grey-100'>
    
    {error && <div className="text-red-500">{error}</div>}
    <form className='bg-white p-6 rounded-lg shadow-lg w-80' onSubmit={handleSubmit}>
    <h2 className='text-2xl font-semibold text-center mb-4'>Login</h2>
      <div className='mb-4'>
      <input
      className='w-full py-3 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      </div>
      <div className='mb-4'>
      <input
      className='w-full py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </div>
      <button className='w-full py-3 bg-blue-500 text-white rounded-md hover:bg:blue-600 focus:outline-none focus:ring-green-500' type="submit">Login</button>
    </form>
  </div>
  );
};

export default Login;
