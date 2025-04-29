import PostCard from '../components/PostCard';
import { usePosts } from '../context/PostContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { posts } = usePosts();
  const { loading, user } = useAuth();

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Left space for Navbar (handled already in App.jsx) */}
      <div className="flex-1 flex flex-col items-center p-4 md:ml-64">
        {/* Post Feed */}
        <div className="w-full md:max-w-2xl">
          {/* Create Post Button */}
          <div className="flex justify-end mb-4">
            <Link
              to="/create-post"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Post
            </Link>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
