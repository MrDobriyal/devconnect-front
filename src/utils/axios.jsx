import axios from 'axios';

 const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend base URL
    // baseURL: 'https://758a-2401-4900-889a-6042-290b-b899-c3ea-cf0.ngrok-free.app/api', // Your backend base URL
  });

//senging token with request
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['ngrok-skip-browser-warning'] = 'true';   //for ngrok only otherwise comment it or stay.
    }
    return config;
  });
  
  export default api;
