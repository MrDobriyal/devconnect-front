import api from '../utils/axios';

export const getAllUsers = async () => {
  const response = await api.get('/users'); 
  return response.data;
};

export const getUserById = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  console.log("user",res);
  return res.data;
};

export const getPostsByUser = async (userId) => {
  const res = await api.get(`/posts/user/${userId}`);
  console.log("post",res);
  return res.data;
};

export const updateProfile = async (formData) => {
  console.log(formData);
  const res = await api.put('/users/update-profile', formData);
  return res.data;
};

export const searchUsers = async (query) => {
  const res = await api.get(`/users/search?q=${query}`);
  return res.data;
};
