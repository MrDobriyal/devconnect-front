import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';

export const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
    const [showComments,setShowComments] =useState([]);
  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };

  const createPost = async (formData) => {
    try {
      await api.post('/posts', formData);
      fetchPosts(); // Refresh posts
    } catch (err) {
      console.error('Post creation failed', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) =>{
    try{
        await api.put(`posts/like/${postId}`);
        fetchPosts(); //refresh updated like count
    }
    catch(err){
        throw err;
    }
  }

  const CommentSubmit = async (postId,text)=>{
    try{
      await api.post(`/posts/comment/${postId}`,{text:text})
      fetchPosts();
    }catch(err){
      throw err;
    }
  }

  const editUserComment = async (postID,commentID)=>{
   try{
    await api.put(`/posts/editComment/${postID}/${commentID}`,{text:text})
   fetchPosts();
   }catch(err){
    throw err;
   }
  }

  const deleteUserComment = async (postID,commentID)=>{
    try{
     await api.delete(`/posts/deleteComment/${postID}/${commentID}`)
    fetchPosts();
    }catch(err){
     throw err;
    }
   }
 

  return (
    <PostContext.Provider value={{ posts, createPost, fetchPosts, 
    handleLike ,showComments ,CommentSubmit, deleteUserComment}}>
      {children}
    </PostContext.Provider>
  );
};

