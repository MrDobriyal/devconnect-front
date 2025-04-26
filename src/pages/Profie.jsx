// pages/Profile.jsx
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import api from '../utils/axios'; 

const Profile = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Local preview
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      setUploading(true);
      const res = await api.put('/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Success:', res.data);
      // Ideally, update your user context here too to refresh profile picture
      window.location.reload(); // Simple reload to fetch new pic
    } catch (err) {
      console.error('Upload Error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

        {user ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={`http://localhost:5000/${user.profilePicture}` || '/default-avatar.png'}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-400"
              />
              <label
                htmlFor="file-upload"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600 transition"
              >
                ✏️
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>

            {selectedFile && (
              <button
                onClick={handleUpload}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Save Changes'}
              </button>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user info...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
