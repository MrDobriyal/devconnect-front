import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ConversationContext } from '../context/ConversationContext';
import { useSocket } from '../context/SocketContext';

const ChatRoom = () => {
  const { conversationId } = useParams();
  const { user } = useContext(AuthContext);
  const { socket, joinConversation } = useSocket();
  const {
    messages,
    fetchMessages,
    sendMessage,
    selectedConversation,
    conversations,
    setMessages
  } = useContext(ConversationContext);

  const [newMsg, setNewMsg] = useState('');
  const messagesEndRef = useRef(null);

  const otherUser = conversations
  .find(conv => conv._id === conversationId)?.members
  .find(member => member._id !== user._id);

  useEffect(() => {
    fetchMessages(conversationId);
    joinConversation(conversationId);
  }, [conversationId]);

  useEffect(() => {
    socket?.on('newMessage', (msg) => {
        console.log('New message received for conversation:', msg);
      if (msg.conversationId === conversationId) {
        fetchMessages(conversationId);
      }
    });

    socket?.on('getMessage', (msg) => {
        console.log('Get message received for conversation:', msg);
        if (msg.conversationId === conversationId) {
            setMessages((prev) => [...prev, msg]);
        }
      });

    return () => {
        socket?.off('newMessage');
        socket?.off('getMessage');
    }
  }, [socket, conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    
    if (!newMsg.trim()) return;
    await sendMessage(conversationId, newMsg);
    
    // Emit the socket event
    socket.emit('sendMessage', {
      senderId: user._id,
      receiverId: otherUser._id,
      text: newMsg,
      conversationId
  });
  console.log(otherUser._id);
  console.log(user._id);
    setNewMsg('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col h-[90vh]">
      {/* Header with user info */}
      <div className="flex items-center space-x-4 mb-2">
        <img src={`http://localhost:5000/${otherUser?.profilePicture}`} alt="User" className="w-10 h-10 rounded-full" />
        <h2 className="text-lg font-semibold">Chat with {otherUser?.name}</h2>
      </div>

      {/* Messages */}
      <div className="bg-white shadow rounded p-4 flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg._id} className={`mb-2 ${msg.sender === user._id ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded ${msg.sender === user._id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="mt-2 flex">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border p-2 rounded-l"
          placeholder="Type a message"
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded-r">Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
