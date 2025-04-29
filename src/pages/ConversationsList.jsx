import React, { useState, useEffect, useContext } from 'react';
import { ConversationContext } from '../context/ConversationContext';
import { AuthContext } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { getAllUsers } from '../api/user';

const ConversationsList = () => {
  const { conversations, startConversation } = useContext(ConversationContext);
  const { user ,loading} = useContext(AuthContext);
  const { joinConversation } = useSocket();
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers.filter(u => u._id !== user._id)); // Exclude current user
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    if (!loading && user) {
      fetchUsers();
    }
  }, [loading, user]);

  const handleStartConversation = async (userId) => {
    await startConversation(userId);
  };

  const handleSelectConversation = (conversationId) => {
    joinConversation(conversationId);
  };

  return (
    
    <div className="p-4 md:ml-64  flex-1 flex flex-col p-4">
      <h2 className="text-lg font-semibold mb-2">Start a New Chat</h2>
      {users.map((u) => (
        <div key={u._id} className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded">
          <div className="flex items-center gap-2">
            <img src={`http://localhost:5000/${u.profilePicture}`} className="w-10 h-10 rounded-full" />
            <span>{u.name}</span>
          </div>
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded"
            onClick={() => handleStartConversation(u._id)}
          >
            Message
          </button>
        </div>
      ))}

      {/* <h2 className="text-lg font-semibold mt-6 mb-2">Your Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations yet. Start one!</p>
      ) : (
        <ul>
          {conversations.map((conversation) => {
            const otherUser = conversation.members.find((member) => member._id !== user._id);
            return (
              <li key={conversation._id} className="mb-1">
                <button onClick={() => handleSelectConversation(conversation._id)}>
                  Chat with {otherUser.name}
                </button>
              </li>
            );
          })}
        </ul>
      )} */}
    </div>
  );
};

export default ConversationsList;
