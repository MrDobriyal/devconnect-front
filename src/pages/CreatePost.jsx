import { useState } from 'react';
import { usePosts } from '../context/PostContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const { createPost } = usePosts();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', description);
    if (image) formData.append('image', image);
    await createPost(formData);
    navigate('/');
  };

  return (
    <div className='flex justify-center items-center h-screen'>
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <textarea 
        placeholder="Write something..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border-green-500 py-3 bg-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input type="file" className='py-3 w-full border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-300' onChange={(e) => setImage(e.target.files[0])} />
      <div className='text-center'>
      <button type="submit" className="py-3 bg-green-600 text-white px-4 rounded">Publish</button>
      </div>
    </form>
    </div>
  );
};

export default CreatePost;
