import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserById, getPostsByUser, updateProfile } from '../api/user'; // Make sure you have this API
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have this

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth(); // Logged-in user info
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const [newName, setNewName] = useState('');
  const [newProfilePic, setNewProfilePic] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserById(userId);
        const postsData = await getPostsByUser(userId);
        setProfileUser(userData);
        setUserPosts(postsData);

        if (user && user._id === userId) {
          setIsOwner(true);
          setNewName(userData.name);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [userId, user]);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('name', newName);
    formData.append("userId",user._id);
    if (newProfilePic) {
      formData.append('avatar', newProfilePic);
    }
  
    // Correctly see what you are sending
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const updatedUser = await updateProfile(formData);
      console.log(updatedUser);
      setProfileUser(updatedUser);
      alert('Profile Updated Successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating profile.');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!profileUser) return <div className="text-center p-4">User not found.</div>;

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen pt-6">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={`http://localhost:5000/${profileUser.profilePicture}`}
            className="w-24 h-24 rounded-full object-cover"
            alt="Profile"
          />

          {isOwner ? (
            <>
              <p className="text-gray-500">{profileUser.email}</p>
              <input
                type="file"
                onChange={(e) => setNewProfilePic(e.target.files[0])}
                className="border p-2"
              />
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-2 w-full max-w-xs"
              />
              <button
                onClick={handleUpdateProfile}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{profileUser.name}</h2>
              <p className="text-gray-500">{profileUser.email}</p>
              <div className="flex space-x-4 mt-2">
                <p className="text-gray-700 font-medium">Posts: {userPosts.length}</p>
                <Link
                  to={`/chat/${userId}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Message
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-full max-w-3xl mt-6 space-y-4">
        {userPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
