import PostCard from '../components/PostCard';
import { usePosts } from '../context/PostContext';
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import { useEffect } from 'react';

const Home = () => {
  const { posts } = usePosts();
  const {loading,user} =useAuth();
  
  return (
    <div className="p-4">
      <Link to="/create-post" className="bg-blue-600 text-white px-4 py-2 rounded">Create Post</Link>
      <div className="mt-4 space-y-4">
        {posts.map(post => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
