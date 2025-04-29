import React, { useContext,useState,useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import {PostContext} from '../context/PostContext';
import { Link } from 'react-router-dom'

export default function PostCard({post}) {
    const {user,loading} = useContext(AuthContext);
    const {handleLike,CommentSubmit,deleteUserComment} = useContext(PostContext);
    const [newComment,setNewComment] =useState('');
    const [showComments,setShowComments]=useState(false);

    function setCommentText(e){
      setNewComment(e.target.value);
    }

    async function handleCommentSubmit(e,postId){
      e.preventDefault();
      try{
      if(newComment!==""){
      await CommentSubmit(postId,newComment);
      setNewComment("");
      }
     }catch(err){
      throw err;
     }
    }

     function toggleComments(){
      setShowComments(prev=>!prev);
    }
    
    const editComment = async(e,postID,commentID)=>{
      e.preventDefault();
      try{
        
      }
      catch(err){
        throw err;
      }
    }

    const deleteComment =async(e,posID,commentID)=>{
      e.preventDefault();
      try{
        await deleteUserComment(posID,commentID);
      }
      catch(err){
        throw err;
      }
    }
   
    if(loading){
      return "loading...";
    }

    return (
    <div className="bg-white shadow p-4 rounded mb-4">
  {/* Author Info */}
  <div className="flex items-center mb-2">
  <Link to={`/profile/${post.author._id}`}>
    <img src={`http://localhost:5000/${post?.author?.profilePicture}`} className="w-10 h-10 rounded-full mr-2" alt="User" />
  </Link>
    <div>
      <p className="font-semibold">{post?.author?.name}</p>
      <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
    </div>
  </div>

  {/* Post Content */}
  <p className="mb-2">{post.content}</p>
  {post.image && (
    <img src={`http://localhost:5000/${post.image}`} className="w-full rounded" alt="Post" />
  )}

  {/* Likes and Comments */}
  <div className="flex items-center space-x-4 mt-2">
    <button onClick={() => handleLike(post._id)}>
      {user && post.likes.includes(user._id) ? '💔 Unlike' : '❤️ Like'} ({post.likes.length})
    </button>
    <button onClick={() => toggleComments()}>
      💬 Comments ({post.comments.length})
    </button>
  </div>

  {/* Comment Box */}
  { showComments &&(
    <div className="mt-4">
      {post.comments.map(comment => (
        <div key={comment._id} className="mb-2 bg-gray-100 p-2 rounded">
          <p className="text-sm font-medium">{comment?.user?.name}</p>
          <p>{comment.text}</p>
          {user &&(comment.user._id === user._id || user.role === 'admin') ? (
            <div className="flex space-x-2 text-sm text-blue-600 mt-1">
              <button onClick={(e) => editComment(e,post._id, comment._id)}>Edit</button>
              <button onClick={(e) => deleteComment(e,post._id, comment._id)}>Delete</button>
            </div>
          ) : null}
        </div>
      ))}
      <form onSubmit={(e) => handleCommentSubmit(e,post._id)} className="mt-2 flex">
        <input
          type="text"
          value={newComment || ''}
          onChange={setCommentText}
          placeholder="Write a comment..."
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="ml-2 px-4 bg-blue-500 text-white rounded">Post</button>
      </form>
    </div>
  )}
</div>
  )
}
