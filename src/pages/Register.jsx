import { useState ,useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
// import { registerUser } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { registerUser,loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error ,setError] =useState('');
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form.name, form.email, form.password);
      if(res){
        navigate('/login',{ state: { email:form.email} });
      }
    } catch (err) {
      setError(err);
      throw err;s
    }
  };

  return (
   
    <div className="flex justify-center items-center h-screen bg-gray-100">
       {error && <div className="text-red-500">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
