import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  const fetchConversations = async () => {
    try {
      const response = await api.get('/messages/conversations');
      setConversations(response.data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    }
  };

  const startConversation = async (recipientId) => {
    try {
      const response = await api.post('/messages/start', { receiverId: recipientId });
      fetchConversations();
      navigate(`/chat/${response.data._id}`);
    } catch (err) {
      console.error('Error starting conversation:', err);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const res = await api.get(`/messages/${conversationId}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const sendMessage = async (conversationId, text) => {
    try {
      const res = await api.post('/messages/send', {
        conversationId,
        sender: user._id,
        text,
      });
      setMessages((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error('Send message failed', err);
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        startConversation,
        fetchMessages,
        sendMessage,
        messages,
        setMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};